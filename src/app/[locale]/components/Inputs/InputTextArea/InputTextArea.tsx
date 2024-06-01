'use client';
//* External
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
//* App Custom
import { InputProps } from '../Input/Input';
import styles from '../Input/input.module.css';
import textAreaStyles from './inputTextArea.module.css';

const InputTextArea = ({
  name,
  label,
  placeholder,
  defaultValue,
  rules = {},
  control
}: InputProps) => {
  const t = useTranslations();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      shouldUnregister={true}
      defaultValue={defaultValue}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <div key={name} className={styles.input_container}>
          <label className={styles.input_label} htmlFor={name}>
            {label && t(label)}
            {rules?.required?.value && (
              <span className={styles.required_symbol}>*</span>
            )}
          </label>
          <textarea
            rows={10}
            id={name}
            placeholder={t(placeholder)}
            defaultValue={defaultValue as string}
            onChange={onChange}
            className={textAreaStyles.input_text_area}
          />
          {error?.message && (
            <p className={styles.error_message}>{t(error?.message)}</p>
          )}
        </div>
      )}
    />
  );
};

export default InputTextArea;
