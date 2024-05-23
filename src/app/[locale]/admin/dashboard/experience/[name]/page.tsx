//* External
import { getTranslations } from 'next-intl/server';
import { Fraunces } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
//* App Custom
import AdminForm from '@/app/[locale]/components/AdminForm/AdminForm';
import prisma from '@/lib/prisma';
import layoutStyles from '../../layout.module.css';

const inter = Fraunces({ subsets: ['latin'] });

interface Props {
  params: { name: string };
}

const getExperience = async ({ params }: Props) => {
  const id = Number(params.name.split('_')[0]);
  const experience = await prisma.experience.findFirst({
    include: { categories: { select: { category: true } } },
    where: { id }
  });
  return experience;
};

export async function generateMetadata({ params }: Props) {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  const paint = await getExperience({ params });

  return {
    title: `Brush - ${paint!.title}`,
    description: t('metadata.admin_experience')
  };
}

export default async function ExperiencePage({ params }: Props) {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  const experience = await getExperience({ params });

  return (
    <div>
      <div className={layoutStyles.dashboard_header}>
        <div>
          <h1 className={inter.className}>{t('sections.experience')}</h1>
          <div className={layoutStyles.dashboard_breadcrumb}>
            <Link href={`/${locale}/admin/dashboard/experiences/`}>
              {t('sections.experiences')}
            </Link>
            <p>/ {experience!.title}</p>
          </div>
        </div>
      </div>
      <AdminForm module="experience" defaultData={experience!} />
    </div>
  );
}
