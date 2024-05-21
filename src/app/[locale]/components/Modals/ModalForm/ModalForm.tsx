//* External
import { useTranslations } from 'next-intl';
import { FieldValues, useForm } from 'react-hook-form';
//* App Custom
import Button from '../../Button/Button';
import { InputProps } from '../../Inputs/Input/Input';
import InputManager from '../../Inputs/InputManager/InputManager';
import styles from '../Modal/modal.module.css';

interface Props {
  title: string;
  inputs: () => InputProps[];
  onSubmit: (data: FieldValues) => void;
  onHide: () => void;
}

const ModalForm = ({
  title,
  inputs = () => [],
  onSubmit = () => {},
  onHide = () => {}
}: Props) => {
  const t = useTranslations();
  const { control, formState, handleSubmit } = useForm({ mode: 'all' });

  return (
    <div className={styles.modal}>
      <p className={styles.modal_title}>{t(title)}</p>
      <span className={styles.modal_close} onClick={onHide}>
        X
      </span>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {inputs().map((input) => (
            <InputManager key={input.name} input={input} control={control} />
          ))}
          <div className={styles.modalForm_btns}>
            <Button variant="secondary" text="buttons.close" onClick={onHide} />
            <Button
              type="submit"
              text={'buttons.submit'}
              disabled={!formState.isValid}
              title={!formState.isValid ? 'titles.missing_inputs_required' : ''}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
