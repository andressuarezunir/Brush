import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

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
  return (
    <div>
      <h1>{t('sections.paints')}</h1>
    </div>
  );
}
