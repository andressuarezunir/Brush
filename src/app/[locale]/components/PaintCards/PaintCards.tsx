//* External
import moment from 'moment-timezone';
import Image from 'next/image';
//* App Custom
import { PaintProps } from '../AdminForm/AdminForm';
import styles from './paintCards.module.css';

interface PaintCardProps {
  data: PaintProps[];
}

const PaintCards = ({ data = [] }: PaintCardProps) => {
  return (
    <div className={styles.paints_container}>
      {data.map(({ id, title, date_finish, image }) => (
        <div key={`paint_${id}`} className={styles.paint_container}>
          <Image
            src={image}
            alt={`${title} img`}
            width={300}
            height={400}
            className={styles.paint_card_image}
          />
          <p className={styles.paint_title}>{title}</p>
          <p className={styles.paint_year}>
            {moment(date_finish).format('DD-MM-YYYY')}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PaintCards;
