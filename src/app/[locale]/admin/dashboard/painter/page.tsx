import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

export async function generateMetadata() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  return {
    title: `Brush - ${t('sections.painter')}`,
    description: t('metadata.admin_painter')
  };
}

export default async function PainterPage() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  return (
    <div>
      <h1>{t('sections.painter')}</h1>
    </div>
  );
}
