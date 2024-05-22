//* External
import moment from 'moment-timezone';
import { useLocale, useTranslations } from 'next-intl';
import { Fraunces } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { FaLocationArrow } from 'react-icons/fa';
//* App Custom
import { ExperienceProps } from '../AdminForm/AdminForm';
import styles from './experience.module.css';

interface Props {
  data: ExperienceProps[];
}
const inter = Fraunces({ subsets: ['latin'] });

const ExperienceCards = ({ data = [] }: Props) => {
  const localeActive = useLocale();
  const t = useTranslations();

  return (
    <div className={styles.experiences_container}>
      {data.map(
        ({ id, title, date_updated, categories, description, image }) => {
          const titleUnderlined = title.replace(' ', '_').toLowerCase();
          return (
            <div
              className={styles.experience_container}
              key={`experience_${id}`}
            >
              <Image
                src={image}
                alt={`${title} img`}
                width={300}
                height={400}
                className={styles.experience_image}
              />
              <div>
                <div className={styles.experience_minor_data}>
                  <p>{categories[0].category.name}</p> -
                  <p>{moment(date_updated).format('DD/MM/YYYY')}</p>
                </div>
                <h2 className={inter.className}>{title}</h2>
              </div>
              <p>{`${description?.substr(0, 135)}... `}</p>
              <Link
                href={`/${localeActive}/experience/${id}_${titleUnderlined}`}
              >
                <p>{t('buttons.see_experience')}</p>
                <FaLocationArrow />
              </Link>
            </div>
          );
        }
      )}
    </div>
  );
};

export default ExperienceCards;
