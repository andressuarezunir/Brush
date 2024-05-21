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
  const painter = await prisma.painter.findFirst({ where: { id: 1 } });

  return (
    <div className={globalStyles.public_container}>
      <div className={styles.hero_section}>
        <div className={globalStyles.public_container_width}>
          <div className={styles.hero_info}>
            <div className={styles.hero_texts}>
              <h1 className={inter.className}>{`Soy ${painter!.name} ${
                painter!.last_name
              }, un pintor`}</h1>
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
      <ContactBanner />
    </div>
  );
}
