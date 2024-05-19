//* External
import { useTranslations } from 'next-intl';
//* App Custom
import styles from './button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  type = 'button',
  variant = 'primary',
  text = '',
  disabled = false,
  onClick
}: ButtonProps) => {
  const t = useTranslations();
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.btn} ${
        variant === 'primary' ? styles.btn_primary : styles.btn_secondary
      }`}
    >
      {t(text)}
    </button>
  );
};

export default Button;
