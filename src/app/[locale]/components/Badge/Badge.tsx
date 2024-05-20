//* External
import { useTranslations } from 'next-intl';
//* App Custom
import styles from './badge.module.css';

interface Props {
  value: string;
}

const Badge = ({ value }: Props) => {
  const t = useTranslations();

  const bgColorOptions = {
    visible: styles.badge_success,
    hidden: styles.badge_fail
  }[value];

  return <div className={`${styles.badge} ${bgColorOptions}`}>{t(value)}</div>;
};

export default Badge;
