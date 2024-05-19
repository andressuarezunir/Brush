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
    title: `Brush - ${t('sections.login')}`,
    description: t('metadata.login')
  };
}

export default function LoginPage() {
  const localActive = useLocale();
  const t = useTranslations();

  return (
    <>
      <h1>Login Page</h1>
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
          },
          {
            type: 'password',
            name: 'password',
            label: 'labels.password',
            placeholder: 'placeholders.password',
            rules: {
              required: {
                value: true,
                message: 'form_errors.input_required'
              }
            }
          }
        ]}
        page="login"
        link={{
          href: `/${localActive}/admin/forgot_pw`,
          text: 'buttons.forgot_pw'
        }}
      />
      <Link href={`/${localActive}/home`} className={layoutStyles.link}>
        <FaArrowLeft />
        {t('return_link.home')}
      </Link>
    </>
  );
}
