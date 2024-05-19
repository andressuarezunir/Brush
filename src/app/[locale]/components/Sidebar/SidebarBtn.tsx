'use client';
//* External
import { deleteCookie, getCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
//* App Custom
import styles from './sidebar.module.css';

const SidebarBtn = () => {
  const t = useTranslations();
  const router = useRouter();
  const locale = getCookie('NEXT_LOCALE') || '';

  return (
    <button
      className={styles.sidebarBtnLogout}
      onClick={() => {
        deleteCookie('NEXT_USER');
        router.replace(`/${locale}/admin/login`);
        router.refresh();
      }}
    >
      {t('buttons.logout')}
    </button>
  );
};

export default SidebarBtn;
