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
    title: `Brush - ${t('sections.forgot_pw')}`,
    description: t('metadata.forgot_pw')
  };
}

export default function ResetPwPage() {
  const localActive = useLocale();
  const t = useTranslations();

  return (
    <>
      <h1>Reset Password Page</h1>
      <PublicForm
        inputs={[
          {
            type: 'text',
            name: 'email',
            label: 'labels.email',
            placeholder: 'placeholders.email',
            rules: {
              required: {
                value: true,
                message: 'form_errors.input_required'
              }
            }
          }
        ]}
        page="forgot_pw"
      />
      <Link href={`/${localActive}/admin/login`} className={layoutStyles.link}>
        <FaArrowLeft />
        {t('return_link.login')}
      </Link>
    </>
  );
}
