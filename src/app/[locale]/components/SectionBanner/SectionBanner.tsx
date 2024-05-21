//* External
import { Fraunces } from 'next/font/google';
import Link from 'next/link';
import { GoArrowLeft } from 'react-icons/go';
//* App Custom
import styles from './sectionBanner.module.css';

interface Props {
  title: string;
  breadcrumb?: {
    text: string;
    link: string;
  };
}

const inter = Fraunces({ subsets: ['latin'] });

const SectionBanner = ({ title, breadcrumb }: Props) => (
  <div className={styles.section_banner}>
    {breadcrumb && (
      <Link href={breadcrumb.link} className={styles.section_breadcrumb}>
        <GoArrowLeft />
        {breadcrumb.text}
      </Link>
    )}
    <h2 className={inter.className}>{title}</h2>
  </div>
);

export default SectionBanner;
