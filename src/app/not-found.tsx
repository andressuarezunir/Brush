import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';
import styles from './not-found.module.css';

export default function NotFound() {
  const localActive = useLocale();
  const t = useTranslations();

  return (
    <main className={styles.notFound}>
      <Link href={`/${localActive}/home`} className={styles.link}>
        <FaArrowLeft />
        {t('error404.link_text')}
      </Link>
      <Image
        src="/404.webp"
        alt="Error img"
        width={500}
        height={0}
        style={{ width: '35%', height: 'auto' }}
      />
      <h1 className={styles.notFound_title}>{t('error404.title')}</h1>
      <div className={styles.notFound_container}>
        <p className={styles.notFound_description}>
          {t('error404.description')}
        </p>
      </div>
    </main>
  );
}
