import styles from '../../globals.module.css';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

interface Props {
  children: React.ReactNode;
}

export default function RootPublicPage({ children }: Props) {
  return (
    <div>
      <Header />
      <div className={styles.public_bg}>
        <div className={styles.public_container}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
