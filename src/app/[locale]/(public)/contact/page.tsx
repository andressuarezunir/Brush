//* External
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
//* App Custom
import globalStyles from '../../../globals.module.css';
import ContactForm from '../../components/ContactForm/ContactForm';
import SectionBanner from '../../components/SectionBanner/SectionBanner';

export async function generateMetadata() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  return {
    title: `Brush - ${t('sections.contact')}`,
    description: t('metadata.public_contact')
  };
}

export default async function ContactPage() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });

  return (
    <div className={globalStyles.public_container}>
      <SectionBanner title={t('sections.contact')} />
      <div className={globalStyles.public_container_width}>
        <ContactForm />
      </div>
    </div>
  );
}
