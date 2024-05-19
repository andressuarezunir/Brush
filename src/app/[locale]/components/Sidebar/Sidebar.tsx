//* External
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { FaPaintBrush, FaUserAlt } from 'react-icons/fa';
import { FaNewspaper } from 'react-icons/fa6';
//* App Custom
import SidebarBtn from './SidebarBtn';
import SidebarItems from './SidebarItem';
import styles from './sidebar.module.css';

const Sidebar = () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';

  const userIcon = <FaUserAlt />;
  const brushIcon = <FaPaintBrush />;
  const newsPaperIcon = <FaNewspaper />;
  const icons = { userIcon, brushIcon, newsPaperIcon };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarNavigation}>
        <Link href={`/${locale}/home`}>
          <Image src="/app_logo.svg" alt="app_logo" width={120} height={80} />
        </Link>
        <SidebarItems icons={icons} />
      </div>
      <SidebarBtn />
    </div>
  );
};

export default Sidebar;
