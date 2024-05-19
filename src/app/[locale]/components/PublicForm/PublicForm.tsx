'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Input, { InputProps } from '../Input/Input';
import styles from './PublicForm.module.css';

interface Props {
  inputs: InputProps[];
  page: 'login' | 'forgot_pw' | 'change_pw';
  link?: { href: string; text: string };
}

const PublicForm = ({ inputs = [], page, link }: Props) => {
  const t = useTranslations();
  const { control, formState, handleSubmit } = useForm({ mode: 'all' });

  const onSubmit = (data: object) => {
    console.log(data, page);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.publicForm}>
      {inputs.map((input) => (
        <Input key={input.name} {...input} control={control} />
      ))}
      <button
        type="submit"
        disabled={!formState.isValid}
        className={styles.submitBtn}
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
