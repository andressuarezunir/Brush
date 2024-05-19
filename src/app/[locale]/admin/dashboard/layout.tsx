//* External
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
//* App Custom
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './layout.module.css';

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const userLogged = cookies().get('NEXT_USER')?.value || null;
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  if (!userLogged) redirect(`/${locale}/admin/login`);
  return (
    <div className={styles.dashboard_layout}>
      <Sidebar />
      <div className={styles.dashboard_inner_page}>
        {children}
        <div className={styles.dashboard_footer_container}>
          <p>Brush - Copyright</p>
          <p className={styles.dashboard_footer_bold}>&copy;</p>
          <p>2024</p>
        </div>
      </div>
    </div>
  );
}
