//* External
import moment from 'moment-timezone';
import { getTranslations } from 'next-intl/server';
import { Fraunces } from 'next/font/google';
import { cookies } from 'next/headers';
import Image from 'next/image';
//* App Custom
import prisma from '@/lib/prisma';
import globalStyles from '../../../globals.module.css';
import ContactBanner from '../../components/ContactBanner/ContactBanner';
import SectionBanner from '../../components/SectionBanner/SectionBanner';
import styles from './aboutme.module.css';

const inter = Fraunces({ subsets: ['latin'] });

export async function generateMetadata() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  return {
    title: `Brush - ${t('sections.about_me')}`,
    description: t('metadata.public_about_me')
  };
}

export default async function AboutMePage() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  const painter = await prisma.painter.findFirst({ where: { id: 1 } });
  const studies = await prisma.studyCategory.findMany({
    include: { study: { where: { status: true, deleted: false } } }
  });

  return (
    <div className={globalStyles.public_container}>
      <SectionBanner title={t('sections.about_me')} />
      <div className={globalStyles.public_container_width}>
        <div className={styles.about_me_intro}>
          <Image
            src={painter!.image}
            alt="painter image"
            width={500}
            height={100}
            className={styles.about_me_image}
          />
          <div className={styles.about_me_intro_info}>
            <h2 className={inter.className}>
              {painter!.name} {painter!.last_name}
            </h2>
            <p>{painter?.description}</p>
          </div>
        </div>
        <div className={styles.studies_wrapper}>
          {studies.map((study) => (
            <div key={study.id} className={styles.study_container}>
              <h3 className={inter.className}>{study.name.toUpperCase()}</h3>
              <div className={styles.study_items}>
                {study.study.length > 0 ? (
                  <>
                    {study.study.map((item) => (
                      <div key={item.id} className={styles.study_info}>
                        <div className={styles.study_title_container}>
                          <p>{item.title}</p>
                          {`(${moment(item.date_start).format('YYYY')} -
                          ${moment(item.date_finish).format('YYYY')})`}
                        </div>
                        <div>
                          <p className={styles.study_subtitle}>
                            {item.subtitle}
                          </p>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>{t('there_is_no_registries_in_this_section')}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ContactBanner />
    </div>
  );
}
