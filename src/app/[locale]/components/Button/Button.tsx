'use client';
//* External
import { useTranslations } from 'next-intl';
//* App Custom
import styles from './button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  iconOnly?: boolean;
  text?: string;
  disabled?: boolean;
  title?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({
  type = 'button',
  variant = 'primary',
  iconOnly = false,
  text = '',
  disabled = false,
  title = '',
  icon,
  onClick
}: ButtonProps) => {
  const t = useTranslations();
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title && t(title)}
      className={`${styles.btn} ${
        variant === 'primary' ? styles.btn_primary : styles.btn_secondary
      } ${iconOnly ? styles.btn_icon_only : ''}`}
    >
      {text && t(text)}
      {icon && icon}
    </button>
  );
};

export default Button;
