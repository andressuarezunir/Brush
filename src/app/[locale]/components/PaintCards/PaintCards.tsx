//* External
import moment from 'moment-timezone';
import Image from 'next/image';
//* App Custom
import { cookies } from 'next/headers';
import Link from 'next/link';
import { PaintProps } from '../AdminForm/AdminForm';
import styles from './paintCards.module.css';

interface PaintCardProps {
  data: PaintProps[];
}

const PaintCards = ({ data = [] }: PaintCardProps) => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';

  return (
    <div className={styles.paints_container}>
      {data.map(({ id, title, date_finish, image }) => {
        const titleUnderlined = title.replace(' ', '_').toLowerCase();
        return (
          <Link
            href={`/${locale}/paint/${id}_${titleUnderlined}`}
            key={`paint_${id}`}
            className={styles.paint_link}
          >
            <div className={styles.paint_container}>
              <div className={styles.paint_image_bg}>
                <Image
                  src={image}
                  alt={`${title} img`}
                  width={300}
                  height={400}
                  className={styles.paint_card_image}
                />
              </div>
              <p className={styles.paint_title}>{title}</p>
              <p className={styles.paint_year}>
                {moment(date_finish).format('DD-MM-YYYY')}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PaintCards;
