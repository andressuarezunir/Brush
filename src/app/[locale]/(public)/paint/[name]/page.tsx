//* External
import moment from 'moment-timezone';
import { getTranslations } from 'next-intl/server';
import { Fraunces } from 'next/font/google';
import { cookies } from 'next/headers';
import Image from 'next/image';
//* App Custom
import ContactBanner from '@/app/[locale]/components/ContactBanner/ContactBanner';
import SectionBanner from '@/app/[locale]/components/SectionBanner/SectionBanner';
import prisma from '@/lib/prisma';
import globalStyles from '../../../../globals.module.css';
import styles from './paint.module.css';

const inter = Fraunces({ subsets: ['latin'] });

interface Props {
  params: { name: string };
}

const getPaint = async ({ params }: Props) => {
  const id = Number(params.name.split('_')[0]);
  const paint = await prisma.paint.findFirst({
    include: { categories: { select: { category: true } } },
    where: { id }
  });
  return paint;
};

export async function generateMetadata({ params }: Props) {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  const paint = await getPaint({ params });
  return {
    title: `Brush - ${paint!.title}`,
    description: t('metadata.public_paint')
  };
}

export default async function PaintPublicPage({ params }: Props) {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  const paint = await getPaint({ params });
  const months: { [key: string]: string } = {
    '01': 'january',
    '02': 'february',
    '03': 'march',
    '04': 'april',
    '05': 'may',
    '06': 'june',
    '07': 'july',
    '08': 'august',
    '09': 'september',
    '10': 'october',
    '11': 'november',
    '12': 'december'
  };
  const month_created = months[moment(paint!.date_created).format('MM')];
  const month_finished = months[moment(paint!.date_finish).format('MM')];

  return (
    <div className={styles.paint_bg}>
      <SectionBanner
        title={paint!.title}
        breadcrumb={{ text: t('sections.paints'), link: `/${locale}/paints` }}
      />
      <Image
        src={paint!.image}
        alt={`paint_${paint!.id}`}
        width={1000}
        height={100}
        className={styles.paint_image}
      />
      <div
        className={`${globalStyles.public_container_width} ${styles.paint_data}`}
      >
        <div className={styles.paint_section}>
          <h2 className={inter.className}>{t('labels.description')}</h2>
          <p>{paint!.description}</p>
          <div className={styles.paint_category}>
            {paint!.categories[0].category.name}
          </div>
        </div>
        <div className={styles.paint_section}>
          <h2 className={inter.className}>{t('labels.paint_details')}</h2>
          <div className={styles.paint_details}>
            <p className={styles.paint_label}>
              {t('labels.year')}
              <span className={styles.paint_value}>
                {moment(paint!.date_finish).format('YYYY')}
              </span>
            </p>
            <p className={styles.paint_label}>
              {t('labels.dimensions')}
              <span className={styles.paint_value}>
                {t('labels.width')}: {paint!.width}cm, {t('labels.height')}:{' '}
                {paint!.height}cm
              </span>
            </p>
            <p className={styles.paint_label}>
              {t('labels.time_required')}
              <span className={styles.paint_value}>
                {t(month_created)} - {t(month_finished)}
              </span>
            </p>
            <p className={styles.paint_label}>
              {t('labels.on_sale')}
              <span className={styles.paint_value}>
                {t(paint!.on_sale ? 'yes' : 'no')}
              </span>
            </p>
          </div>
        </div>
      </div>
      <ContactBanner />
    </div>
  );
}
