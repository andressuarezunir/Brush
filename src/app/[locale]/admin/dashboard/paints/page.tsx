//* External
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
//* App Custom
import Table from '@/app/[locale]/components/Table/Table';
import prisma from '@/lib/prisma';

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
    include: { categories: { select: { category: true } } }
  });

  return (
    <div>
      <h1>{t('sections.paints')}</h1>
      <Table data={paints} module="paints" />
    </div>
  );
}
