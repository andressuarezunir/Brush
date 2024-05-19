'use client';
//* External
import Link from 'next/link';
import { usePathname } from 'next/navigation';
//* App Custom
import styles from './Header.module.css';

interface Props {
  data: {
    path: string;
    label: string;
  }[];
}

const HeaderLinks = ({ data = [] }: Props) => {
  const pathName = usePathname();

  return (
    <ul className={styles.header_links_container}>
      {data.map((link) => (
        <li key={link.path}>
          <Link
            href={link.path}
            className={`${styles.header_link} ${
              pathName === link.path ? styles.header_link_active : ''
            }`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HeaderLinks;
