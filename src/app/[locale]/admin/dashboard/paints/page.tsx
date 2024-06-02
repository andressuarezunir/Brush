//* External
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
//* App Custom
import AddRegistry from '@/app/[locale]/components/AddRegistry/AddRegistry';
import Table from '@/app/[locale]/components/Table/Table';
import prisma from '@/lib/prisma';
import { Fraunces } from 'next/font/google';
import styles from '../layout.module.css';

const inter = Fraunces({ subsets: ['latin'] });

export async function generateMetadata() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  return {
    title: `Brush - ${t('sections.paints')}`,
    description: t('metadata.admin_paints')
  };
}

export default async function PaintsPage() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  const paints = await prisma.paint.findMany({
    include: { categories: { select: { category: true } } },
    where: { deleted: false },
    orderBy: { date_finish: 'desc' }
  });

  return (
    <div>
      <div className={styles.dashboard_header}>
        <h1 className={inter.className}>{t('sections.paints')}</h1>
        <AddRegistry name="paint" />
      </div>
      <Table key={paints.length} data={paints} module="paint" />
    </div>
  );
}
