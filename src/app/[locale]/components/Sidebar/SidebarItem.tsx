'use client';
//* External
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
//* App Custom
import styles from './sidebar.module.css';

interface IconsProps {
  icons: {
    userIcon: JSX.Element;
    brushIcon: JSX.Element;
    newsPaperIcon: JSX.Element;
  };
}

const SidebarItems = ({ icons }: IconsProps) => {
  const t = useTranslations();
  const pathName = usePathname();
  const localActive = useLocale();
  const sidebarItems = [
    {
      name: 'painter',
      icon: icons.userIcon,
      href: `painter`,
      text: 'sections.painter'
    },
    {
      name: 'paints',
      icon: icons.brushIcon,
      href: 'paints',
      text: 'sections.paints'
    },
    {
      name: 'experiences',
      icon: icons.newsPaperIcon,
      href: 'experiences',
      text: 'sections.experiences'
    }
  ];

  return (
    <div className={styles.sidebarItems}>
      {sidebarItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`${styles.sidebarLink} ${
            pathName === `/${localActive}/admin/dashboard/${item.href}`
              ? styles.sidebarLinkActive
              : ''
          }`}
        >
          {item.icon}
          <p>{t(item.text)}</p>
        </Link>
      ))}
    </div>
  );
};

export default SidebarItems;
