import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './Header.module.css';
import HeaderLinks from './HeaderLink';

const Header = () => {
  const t = useTranslations();
  const localActive = useLocale();
  const links = [
    { label: t('sections.home'), path: `/${localActive}/home` },
    { label: t('sections.paints'), path: `/${localActive}/paints` },
    { label: t('sections.experiences'), path: `/${localActive}/experiences` },
    { label: t('sections.about_me'), path: `/${localActive}/about_me` },
    { label: t('sections.contact'), path: `/${localActive}/contact` }
  ];

  return (
    <div className={styles.header_bg}>
      <div className={styles.header_container}>
        <Image src="/app_logo.svg" alt="app logo" width={100} height={30} />
        <HeaderLinks data={links} />
      </div>
    </div>
  );
};

export default Header;
