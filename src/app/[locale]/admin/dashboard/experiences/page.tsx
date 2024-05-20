//* External
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
//* App Custom
import styles from '../layout.module.css';

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
      <div className={styles.dashboard_header}>
        <h1>{t('sections.experiences')}</h1>
      </div>
    </div>
  );
}
