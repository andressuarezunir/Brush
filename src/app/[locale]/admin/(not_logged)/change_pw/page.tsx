import { useLocale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';

import PublicForm from '@/app/[locale]/components/PublicForm/PublicForm';
import layoutStyles from '../layout.module.css';

export async function generateMetadata() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });

  return {
    title: `Brush - ${t('sections.change_pw')}`,
    description: t('metadata.change_pw')
  };
}

export default function ChangePwPage() {
  const localActive = useLocale();
  const t = useTranslations();

  return (
    <>
      <h1>Change Password Page</h1>
      <PublicForm
        inputs={[
          {
            type: 'password',
            name: 'password',
            label: 'labels.new_password',
            placeholder: 'placeholders.new_password',
            rules: {
              required: {
                value: true,
                message: 'form_errors.input_required'
              }
            }
          },
          {
            type: 'password',
            name: 'verify_password',
            label: 'labels.verify_password',
            placeholder: 'placeholders.verify_password',
            rules: {
              required: {
                value: true,
                message: 'form_errors.input_required'
              }
            }
          }
        ]}
        page="change_pw"
      />
      <Link href={`/${localActive}/admin/login`} className={layoutStyles.link}>
        <FaArrowLeft />
        {t('return_link.login')}
      </Link>
    </>
  );
}
