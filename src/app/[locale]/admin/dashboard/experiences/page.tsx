//* External
import { getTranslations } from 'next-intl/server';
import { Fraunces } from 'next/font/google';
import { cookies } from 'next/headers';
//* App Custom
import AddRegistry from '@/app/[locale]/components/AddRegistry/AddRegistry';
import Table from '@/app/[locale]/components/Table/Table';
import prisma from '@/lib/prisma';
import styles from '../layout.module.css';

const inter = Fraunces({ subsets: ['latin'] });

export async function generateMetadata() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  return {
    title: `Brush - ${t('sections.experiences')}`,
    description: t('metadata.admin_experiences')
  };
}

export default async function ExperiencesPage() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  const experiences = await prisma.experience.findMany({
    include: { categories: { select: { category: true } } },
    where: { deleted: false },
    orderBy: { date_updated: 'desc' }
  });

  return (
    <div>
      <div className={styles.dashboard_header}>
        <h1 className={inter.className}>{t('sections.experiences')}</h1>
        <AddRegistry name="experience" />
      </div>
      <Table key={experiences.length} data={experiences} module="experience" />
    </div>
  );
}
