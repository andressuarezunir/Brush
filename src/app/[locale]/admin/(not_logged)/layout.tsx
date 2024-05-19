import Image from 'next/image';
import Footer from '../../components/Footer/Footer';
import styles from './layout.module.css';

interface Props {
  children: React.ReactNode;
}

export default function RootAdminPage({ children }: Props) {
  return (
    <div className={styles.admin_container}>
      <div className={styles.admin_bg}>
        <div className={styles.admin_not_logged_form}>
          <Image src="/app_logo.svg" alt="app logo" width={600} height={80} />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
