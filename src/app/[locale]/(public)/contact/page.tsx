//* External
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
//* App Custom
import globalStyles from '../../../globals.module.css';

export async function generateMetadata() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });

  return {
    title: `Brush - ${t('sections.contact')}`,
    description: t('metadata.public_contact')
  };
}

export default function ContactPage() {
  return (
    <div className={globalStyles.public_container}>
      <div className={globalStyles.public_container_width}>
        <h1>Contact Page</h1>
      </div>
    </div>
  );
}
