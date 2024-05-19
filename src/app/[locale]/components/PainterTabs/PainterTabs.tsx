'use client';
//* External
import { useTranslations } from 'next-intl';
import { useState } from 'react';
//* App Custom
import PainterGeneralData, {
  PainterGeneralDataProps
} from '../PainterGeneralData/PainterGeneralData';
import PainterStudiesData, {
  PainterStudiesProps
} from '../PainterStudiesData/PainterStudiesData';
import styles from './painterTabs.module.css';

interface PainterTabs {
  painter: PainterGeneralDataProps;
  studies: PainterStudiesProps[];
}

const PainterTabs = ({ painter, studies }: PainterTabs) => {
  const t = useTranslations();
  const [tabSelected, setTabSelected] = useState('general');
  const tabs = ['general', 'studies'];

  return (
    <div className={styles.painter_container}>
      <div className={styles.painter_tabs}>
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`${styles.painter_tab} ${
              tabSelected === tab ? styles.painter_tab_active : ''
            }`}
            onClick={() => setTabSelected(tab)}
          >
            <p>{t(`tabs.${tab}`)}</p>
          </div>
        ))}
      </div>
      <div className={styles.painter_sections}>
        {tabSelected === 'general' && <PainterGeneralData painter={painter} />}
        {tabSelected === 'studies' && <PainterStudiesData studies={studies} />}
      </div>
    </div>
  );
};

export default PainterTabs;
