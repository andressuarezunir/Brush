//* External
import { useTranslations } from 'next-intl';
//* App Custom
import styles from './modal.module.css';

interface Props {
  title: string;
  description: string;
  body: React.ReactNode;
  onHide: () => void;
}
const Modal = ({ title, description, body, onHide = () => {} }: Props) => {
  const t = useTranslations();

  return (
    <div className={styles.modal}>
      <span className={styles.modal_close} onClick={onHide}>
        X
      </span>
      <div className={styles.modal_body}>
        <div>
          <p className={styles.modal_title}>{t(title)}</p>
          <p>{t(description)}</p>
        </div>
        {body}
      </div>
    </div>
  );
};

export default Modal;
