'use client';
//* External
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
//* App Custom
import Input, { InputProps } from '../Input/Input';
import styles from './PublicForm.module.css';
import {
  changePasswordPwRequest,
  forgotPwRequest,
  loginRequest
} from './requests';

export interface LoginProps {
  email: string;
  password: string;
}

export interface ForgotProps {
  email: string;
}

export interface ChangeProps {
  password: string;
  verify_password: string;
}

interface PublicFormProps {
  inputs: InputProps[];
  page: 'login' | 'forgot_pw' | 'change_pw';
  link?: { href: string; text: string };
}

const PublicForm = ({ inputs = [], page, link }: PublicFormProps) => {
  const t = useTranslations();
  const router = useRouter();
  const locale = getCookie('NEXT_LOCALE') || '';
  const [doingRequest, setDoingRequest] = useState(false);
  const { control, formState, handleSubmit } = useForm({ mode: 'all' });

  const onSubmit = (data: FieldValues) => {
    switch (page) {
      case 'login':
        onSubmitLogin(data as LoginProps);
        break;
      case 'forgot_pw':
        onSubmitForgotPw(data as ForgotProps);
        break;
      case 'change_pw':
        onSubmitChangePw(data as ChangeProps);
        break;
      default:
        break;
    }
  };

  const onSubmitLogin = async (data: LoginProps) => {
    setDoingRequest(true);
    const user = await loginRequest(data);
    setDoingRequest(false);
    if (user?.error_message) {
      toast(t(`toasts.${user?.error_message}`), { type: 'error' });
    } else {
      setCookie('NEXT_USER', user?.email);
      router.refresh();
    }
  };

  const onSubmitForgotPw = async (data: ForgotProps) => {
    setDoingRequest(true);
    const response = await forgotPwRequest(data);
    setDoingRequest(false);
    if (response?.error_message) {
      toast(t(`toasts.${response?.error_message}`), { type: 'error' });
    } else {
      setCookie('NEXT_EMAIL', response?.email);
      setCookie('NEXT_TOKEN', response?.token);
      router.replace(`/${locale}/admin/change_pw`);
    }
  };

  const onSubmitChangePw = async (data: ChangeProps) => {
    setDoingRequest(true);
    const params = {
      email: getCookie('NEXT_EMAIL'),
      token: getCookie('NEXT_TOKEN')
    };
    const response = await changePasswordPwRequest({ params, data });
    setDoingRequest(false);
    if (response?.error_message) {
      toast(t(`toasts.${response?.error_message}`), { type: 'error' });
    } else {
      toast(t(`toasts.${response?.success_message}`), { type: 'success' });
      deleteCookie('NEXT_EMAIL');
      deleteCookie('NEXT_TOKEN');
      router.replace(`/${locale}/admin/login`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.publicForm}>
      {inputs.map((input) => (
        <Input key={input.name} {...input} control={control} />
      ))}
      <button
        type="submit"
        disabled={!formState.isValid || doingRequest}
        className={styles.submitBtn}
        title={!formState.isValid ? 'titles.missing_inputs_required' : ''}
      >
        {t('buttons.submit')}
      </button>
      {link && (
        <div className={styles.link_container}>
          <Link href={link?.href} className={styles.link}>
            {t(link?.text)}
          </Link>
        </div>
      )}
    </form>
  );
};

export default PublicForm;
