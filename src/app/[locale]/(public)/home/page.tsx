//* External
import { getTranslations } from 'next-intl/server';
import { Fraunces } from 'next/font/google';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { FaLocationArrow } from 'react-icons/fa';
//* App Custom
import prisma from '@/lib/prisma';
import globalStyles from '../../../globals.module.css';
import Button from '../../components/Button/Button';
import ContactBanner from '../../components/ContactBanner/ContactBanner';
import ExperienceCards from '../../components/ExperienceCards/ExperienceCards';
import PaintCards from '../../components/PaintCards/PaintCards';
import styles from './page.module.css';

const inter = Fraunces({ subsets: ['latin'] });

export async function generateMetadata() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  return {
    title: `Brush - ${t('sections.home')}`,
    description: t('metadata.public_home')
  };
}

export default async function HomePage() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  const painter = await prisma.painter.findFirst({ where: { id: 1 } });
  const paints = await prisma.paint.findMany({
    include: { categories: { select: { category: true } } },
    where: { status: true, deleted: false },
    orderBy: { date_finish: 'desc' }
  });
  const experiences = await prisma.experience.findMany({
    include: { categories: { select: { category: true } } },
    where: { status: true, deleted: false },
    orderBy: { date_updated: 'desc' }
  });
  const firstPaints = paints!.slice(0, 6);
  const firstExperiences = experiences!.slice(0, 2);

  return (
    <div className={globalStyles.public_container}>
      <div className={styles.hero_section}>
        <div className={globalStyles.public_container_width}>
          <div className={styles.hero_info}>
            <div className={styles.hero_texts}>
              <h1 className={inter.className}>{`${t('i_am')} ${painter!.name} ${
                painter!.last_name
              }, ${t('a_painter')}`}</h1>
              <p>{`"${painter!.welcome_message}"`}</p>
              <Link href={`/${locale}/contact`}>
                <Button text="buttons.contact_me" icon={<FaLocationArrow />} />
              </Link>
            </div>
            <Image
              src={painter!.image}
              alt="painter image"
              width={500}
              height={100}
              className={styles.hero_painter_image}
            />
          </div>
        </div>
      </div>
      <div className={styles.home_section}>
        <div className={globalStyles.public_container_width}>
          <div className={styles.home_section_interaction}>
            <h2>{t('home_sections.paints')}</h2>
            {firstPaints.length > 0 ? (
              <>
                <PaintCards data={firstPaints} />
                <Link href={`/${locale}/paints`}>
                  <Button
                    text="buttons.see_all_paints"
                    icon={<FaLocationArrow />}
                  />
                </Link>
              </>
            ) : (
              <p>{t('there_is_no_registries_in_this_section')}</p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.home_section}>
        <div className={globalStyles.public_container_width}>
          <div className={styles.home_section_interaction}>
            <h2>{t('home_sections.experiences')}</h2>
            {firstExperiences.length > 0 ? (
              <>
                <ExperienceCards data={firstExperiences} />
                <Link href={`/${locale}/experiences`}>
                  <Button
                    text="buttons.see_all_experiences"
                    icon={<FaLocationArrow />}
                  />
                </Link>
              </>
            ) : (
              <p>{t('there_is_no_registries_in_this_section')}</p>
            )}
          </div>
        </div>
      </div>
      <ContactBanner />
    </div>
  );
}
