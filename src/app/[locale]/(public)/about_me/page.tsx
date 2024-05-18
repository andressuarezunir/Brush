import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

export async function generateMetadata() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });

  return {
    title: `Brush - ${t('sections.about_me')}`,
    description: t('metadata.public_about_me')
  };
}

export default function AboutMePage() {
  const t = useTranslations();

  return (
    <div>
      <h1>About Me Page</h1>
      <p>{t('test')}</p>
    </div>
  );
}
