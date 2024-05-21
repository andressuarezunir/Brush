//* External
import { getTranslations } from 'next-intl/server';
import { Fraunces } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { FaLocationArrow } from 'react-icons/fa';
//* App Custom
import Button from '../Button/Button';
import styles from './contactBanner.module.css';

const inter = Fraunces({ subsets: ['latin'] });

const ContactBanner = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  return (
    <div className={styles.banner}>
      <h3 className={inter.className}>{t('banner.question')}</h3>
      <p>{t('banner.description')}</p>
      <Link href={`/${locale}/contact`}>
        <Button text="banner.button" icon={<FaLocationArrow />} />
      </Link>
    </div>
  );
};

export default ContactBanner;
