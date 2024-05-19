import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

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
  return (
    <div>
      <h1>{t('sections.experiences')}</h1>
    </div>
  );
}
