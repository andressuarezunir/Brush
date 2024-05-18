import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

export async function generateMetadata() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });

  return {
    title: `Brush - ${t('sections.experiences')}`,
    description: t('metadata.public_experiences')
  };
}

export default function ExperiencesPage() {
  const t = useTranslations();

  return (
    <div>
      <h1>Experiences Page</h1>
      <p>{t('test')}</p>
    </div>
  );
}
