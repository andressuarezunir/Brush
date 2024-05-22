'use client';
//* External
import moment from 'moment-timezone';
import Image from 'next/image';
//* App Custom
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { PaintProps } from '../AdminForm/AdminForm';
import styles from './paintCards.module.css';

interface PaintCardProps {
  data: PaintProps[];
}

const PaintCards = ({ data = [] }: PaintCardProps) => {
  const localeActive = useLocale();

  return (
    <div className={styles.paints_container}>
      {data.map(({ id, title, date_finish, image }) => {
        const titleUnderlined = title.replace(' ', '_').toLowerCase();
        return (
          <Link
            href={`/${localeActive}/paint/${id}_${titleUnderlined}`}
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
