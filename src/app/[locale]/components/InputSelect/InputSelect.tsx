//* External
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
//* App Custom
import { InputProps } from '../Input/Input';
import styles from '../Input/input.module.css';
import selectStyles from './inputSelect.module.css';

export interface InputSelectOptions {
  text: string;
  value: string | number;
}

const InputSelect = ({
  name,
  label,
  placeholder,
  defaultValue,
  options = [],
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
          <select
            id={name}
            onChange={onChange}
            className={selectStyles.input_select_container}
            defaultValue={defaultValue || ''}
          >
            <option value="" disabled>
              {t(placeholder)}
            </option>
            {options.map((option) => (
              <option
                key={option.text}
                value={option.value}
                defaultValue={defaultValue}
              >
                {t(option.text)}
              </option>
            ))}
          </select>
          {error?.message && (
            <p className={styles.error_message}>{t(error?.message)}</p>
          )}
        </div>
      )}
    />
  );
};

export default InputSelect;
