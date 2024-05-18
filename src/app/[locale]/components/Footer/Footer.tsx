import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer_container}>
      <p>Brush - Copyright</p>
      <p className={styles.footer_bold}>&copy;</p>
      <p>2024</p>
    </div>
  );
};

export default Footer;
