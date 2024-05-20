//* External
import { useTranslations } from 'next-intl';
//* App Custom
import styles from './modal.module.css';

interface Props {
  title: string;
  body: React.ReactNode;
  onHide: () => void;
}
const Modal = ({ title, body, onHide = () => {} }: Props) => {
  const t = useTranslations();

  return (
    <div className={styles.modal}>
      <p className={styles.modal_title}>{t(title)}</p>
      <span className={styles.modal_close} onClick={onHide}>
        X
      </span>
      <div>{body}</div>
    </div>
  );
};

export default Modal;
