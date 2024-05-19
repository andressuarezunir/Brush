'use client';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

import styles from './LanguageSwitcher.module.css';
import EnglishFlag from '/public/english_flag.svg';
import SpanishFlag from '/public/spanish_flag.svg';

const LanguageSwitcher = () => {
  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname();
  const localActive = useLocale();
  const [isPending, startTransition] = useTransition();

  const onLanguageChange = (locale: string) => {
    const newPathname = pathname.replace(/^\/\w+/, '/' + locale);
    startTransition(() => {
      router.replace(newPathname);
      router.refresh();
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (localActive === 'en') onLanguageChange('es');
          else onLanguageChange('en');
        }}
        className={styles.language_switcher}
        disabled={isPending}
      >
        <Image
          src={localActive === 'en' ? EnglishFlag : SpanishFlag}
          alt="Error img"
          width={40}
          height={40}
          title={t('change_language')}
        />
      </button>
    </>
  );
};

export default LanguageSwitcher;
