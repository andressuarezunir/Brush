'use client';
import { useTranslations } from 'next-intl';
import { Control, Controller } from 'react-hook-form';
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
  type: 'text' | 'password';
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  defaultValue?: string | number;
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
          <label className={styles.input_label}>
            {label && t(label)}
            {rules?.required?.value && (
              <span className={styles.required_symbol}>*</span>
            )}
          </label>
          <input
            type={type}
            id={name}
            name={name}
            placeholder={t(placeholder)}
            defaultValue={defaultValue}
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
