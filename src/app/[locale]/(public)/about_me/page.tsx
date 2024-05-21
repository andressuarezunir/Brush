//* External
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
//* App Custom
import globalStyles from '../../../globals.module.css';
import ContactBanner from '../../components/ContactBanner/ContactBanner';

export async function generateMetadata() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });

  return {
    title: `Brush - ${t('sections.about_me')}`,
    description: t('metadata.public_about_me')
  };
}

export default function AboutMePage() {
  return (
    <div className={globalStyles.public_container}>
      <div className={globalStyles.public_container_width}>
        <h1>About Me Page</h1>
      </div>
      <ContactBanner />
    </div>
  );
}
