//* External
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
//* App Custom
import Footer from '../../components/Footer/Footer';
import styles from './layout.module.css';

interface Props {
  children: React.ReactNode;
}

export default function RootAdminPage({ children }: Props) {
  const userLogged = cookies().get('NEXT_USER')?.value || null;
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  if (userLogged) redirect(`/${locale}/admin/dashboard`);

  return (
    <div className={styles.admin_container}>
      <div className={styles.admin_bg}>
        <div className={styles.admin_not_logged_form}>
          <Image src="/app_logo.svg" alt="app logo" width={280} height={80} />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
