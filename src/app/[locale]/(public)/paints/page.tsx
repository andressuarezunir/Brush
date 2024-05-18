import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

export async function generateMetadata() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });

  return {
    title: `Brush - ${t('sections.paints')}`,
    description: t('metadata.public_paints')
  };
}

export default function PaintsPage() {
  const t = useTranslations();

  return (
    <div>
      <h1>Paints Page</h1>
      <p>{t('test')}</p>
    </div>
  );
}
