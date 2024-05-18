import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

export async function generateMetadata() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });

  return {
    title: `Brush - ${t('sections.home')}`,
    description: t('metadata.public_home')
  };
}

export default function HomePage() {
  const t = useTranslations();

  return (
    <div>
      <h1>Hello Page</h1>
      <p>{t('test')}</p>
    </div>
  );
}
