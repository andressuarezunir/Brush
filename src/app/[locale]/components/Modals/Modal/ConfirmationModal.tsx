//* External
import { useTranslations } from 'next-intl';
//* App Custom
import Button from '../../Button/Button';
import styles from './modal.module.css';

interface Props {
  title: string;
  description: string;
  doingRequest: boolean;
  onHide: () => void;
  onSubmit: () => void;
}
const ConfirmationModal = ({
  title,
  description,
  doingRequest = false,
  onHide = () => {},
  onSubmit = () => {}
}: Props) => {
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
        <div className={styles.modalForm_btns}>
          <Button
            variant="secondary"
            text="buttons.close"
            onClick={onHide}
            disabled={doingRequest}
          />
          <Button
            text="buttons.confirm"
            disabled={doingRequest}
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
