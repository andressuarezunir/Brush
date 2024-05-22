//* External
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
//* App Custom
import prisma from '@/lib/prisma';
import globalStyles from '../../../globals.module.css';
import ContactBanner from '../../components/ContactBanner/ContactBanner';
import ExperienceCards from '../../components/ExperienceCards/ExperienceCards';
import FilterRegistries from '../../components/FilterRegistries/FilterRegistries';
import SectionBanner from '../../components/SectionBanner/SectionBanner';
import styles from '../paints/paints.module.css';

export async function generateMetadata() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  return {
    title: `Brush - ${t('sections.experiences')}`,
    description: t('metadata.public_experiences')
  };
}

interface Props {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function ExperiencesPage({ params, searchParams }: Props) {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  let titleParam = {};
  if (searchParams?.title) {
    titleParam = {
      title: { contains: searchParams?.title, mode: 'insensitive' }
    };
  }
  const experiences = await prisma.experience.findMany({
    include: { categories: { select: { category: true } } },
    where: {
      status: true,
      deleted: false,
      ...titleParam
    }
  });

  return (
    <div className={globalStyles.public_container}>
      <SectionBanner title={t('sections.experiences')} />
      <div className={globalStyles.public_container_width}>
        <div className={styles.page_container}>
          <FilterRegistries module="experience" />
          <ExperienceCards data={experiences} />
        </div>
      </div>
      <ContactBanner />
    </div>
  );
}
