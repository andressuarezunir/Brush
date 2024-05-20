//* External
import { useTranslations } from 'next-intl';
import { FieldValues, useForm } from 'react-hook-form';
//* App Custom
import Button from '../Button/Button';
import Input, { InputProps } from '../Input/Input';
import InputDropzone from '../InputDropzone/InputDropzone';
import InputSelect from '../InputSelect/InputSelect';
import InputTextArea from '../InputTextArea/InputTextArea';
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
          {inputs().map((input) => {
            let inputToBeRendered;
            if (input.type === 'textarea') {
              inputToBeRendered = (
                <InputTextArea key={input.name} {...input} control={control} />
              );
            } else if (['text', 'number', 'date'].includes(input.type)) {
              inputToBeRendered = (
                <Input key={input.name} {...input} control={control} />
              );
            } else if (input.type === 'select') {
              inputToBeRendered = (
                <InputSelect key={input.name} {...input} control={control} />
              );
            } else if (input.type === 'dropzone') {
              inputToBeRendered = (
                <InputDropzone key={input.name} {...input} control={control} />
              );
            }
            return inputToBeRendered;
          })}
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
