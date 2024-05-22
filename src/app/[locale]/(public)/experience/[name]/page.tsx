//* External
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import Image from 'next/image';
//* App Custom
import ContactBanner from '@/app/[locale]/components/ContactBanner/ContactBanner';
import SectionBanner from '@/app/[locale]/components/SectionBanner/SectionBanner';
import prisma from '@/lib/prisma';
import globalStyles from '../../../../globals.module.css';
import styles from './experience.module.css';

interface Props {
  params: { name: string };
}

const getExperience = async ({ params }: Props) => {
  const id = Number(params.name.split('_')[0]);
  const paint = await prisma.experience.findFirst({
    include: { categories: { select: { category: true } } },
    where: { id }
  });
  return paint;
};

export async function generateMetadata({ params }: Props) {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  const experience = await getExperience({ params });
  return {
    title: `Brush - ${experience!.title}`,
    description: t('metadata.public_experience')
  };
}

export default async function PaintPublicPage({ params }: Props) {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  const experience = await getExperience({ params });

  return (
    <div className={styles.experience_bg}>
      <SectionBanner
        title={experience!.title}
        breadcrumb={{
          text: t('sections.experiences'),
          link: `/${locale}/experiences`
        }}
      />
      <div
        className={`${globalStyles.public_container_width} ${styles.experience_data}`}
      >
        <Image
          src={experience!.image}
          alt={`paint_${experience!.id}`}
          width={1000}
          height={100}
          className={styles.experience_image}
        />
        <p>{experience!.description}</p>
      </div>
      <ContactBanner />
    </div>
  );
}
