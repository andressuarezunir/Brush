'use client';
//* External
import { useTranslations } from 'next-intl';
import { Control, Controller } from 'react-hook-form';
//* App Custom
import { InputSelectOptions } from '../InputSelect/InputSelect';
import styles from './input.module.css';

interface InputRequiredRule {
  value: boolean;
  message: string;
}
interface InputRegexRule {
  value: RegExp;
  message: string;
}

interface InputRuleOptions {
  required?: InputRequiredRule;
  pattern?: InputRegexRule;
}

export interface InputProps {
  type:
    | 'text'
    | 'number'
    | 'password'
    | 'textarea'
    | 'dropzone'
    | 'date'
    | 'select';
  name: string;
  label?: string;
  placeholder?: string;
  options?: InputSelectOptions[];
  defaultValue?: string | number | boolean;
  rules?: InputRuleOptions;
  control?: Control;
}

const Input = ({
  type,
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
          <input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder && t(placeholder)}
            defaultValue={defaultValue as string | number}
            onChange={onChange}
            className={styles.input}
          />
          {error?.message && (
            <p className={styles.error_message}>{t(error?.message)}</p>
          )}
        </div>
      )}
    />
  );
};

export default Input;
