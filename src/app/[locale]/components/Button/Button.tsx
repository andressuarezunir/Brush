//* External
import { useTranslations } from 'next-intl';
//* App Custom
import styles from './button.module.css';

interface ButtonProps {
  type: 'button' | 'submit';
  text: string;
  disabled: boolean;
  onClick?: () => void;
}

const Button = ({
  type = 'button',
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
      className={styles.btn}
    >
      {t(text)}
    </button>
  );
};

export default Button;
