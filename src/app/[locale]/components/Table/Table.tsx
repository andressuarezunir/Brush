'use client';
//* External
import moment from 'moment-timezone';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import DataTable from 'react-data-table-component';
import { FieldValues, useForm } from 'react-hook-form';
import { FaPencilAlt } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
//* App Custom
import { cleanObject } from '@/app/helpers/cleanObject';
import Badge from '../Badge/Badge';
import Button from '../Button/Button';
import { InputProps } from '../Inputs/Input/Input';
import InputManager from '../Inputs/InputManager/InputManager';
import { filterExperiences, filterPaints } from './requests';
import styles from './table.module.css';

interface Column<T> {
  name?: string;
  cell: (item: T) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  module: 'paint' | 'experience';
}

const Table = <T extends object>({ data = [], module }: TableProps<T>) => {
  const t = useTranslations();
  const router = useRouter();
  const localActive = useLocale();
  const [isPending, setTransition] = useTransition();
  const { control, handleSubmit } = useForm({ mode: 'all' });
  const [dataToShow, setDataToShow] = useState(data);

  const paintColumns: Column<T>[] = [
    {
      name: t('labels.actions'),
      cell: ({ id, title }) => (
        <Button
          variant="secondary"
          title="titles.update_paint"
          iconOnly
          disabled={isPending}
          icon={<FaPencilAlt />}
          onClick={() => {
            const titleUnderlined = title.replace(' ', '_').toLowerCase();
            setTransition(() => {
              router.replace(
                `/${localActive}/admin/dashboard/paint/${id}_${titleUnderlined}`
              );
            });
          }}
        />
      )
    },
    {
      name: t('labels.title'),
      cell: ({ title }) => title
    },
    {
      name: t('labels.date_finish'),
      cell: ({ date_finish }) => moment(date_finish).format('YYYY-MM-DD')
    },
    {
      name: t('labels.width'),
      cell: ({ width }) => `${width} cm`
    },
    {
      name: t('labels.height'),
      cell: ({ height }) => `${height} cm`
    },
    {
      name: t('labels.status'),
      cell: ({ status }) => (
        <Badge value={status === true ? 'visible' : 'hidden'} />
      )
    }
  ];

  const experienceColumns: Column<T>[] = [
    {
      name: t('labels.actions'),
      cell: ({ id, title }) => (
        <Button
          variant="secondary"
          title="titles.update_experience"
          iconOnly
          disabled={isPending}
          icon={<FaPencilAlt />}
          onClick={() => {
            const titleUnderlined = title.replace(' ', '_').toLowerCase();
            setTransition(() => {
              router.replace(
                `/${localActive}/admin/dashboard/experience/${id}_${titleUnderlined}`
              );
            });
          }}
        />
      )
    },
    {
      name: t('labels.title'),
      cell: ({ title }) => title
    },
    {
      name: t('labels.date_updated'),
      cell: ({ date_updated }) =>
        moment(date_updated).format('YYYY-MM-DD HH:mm')
    },
    {
      name: t('labels.category'),
      cell: ({ categories }) => categories?.[0]?.category?.name || ' - '
    },
    {
      name: t('labels.status'),
      cell: ({ status }) => (
        <Badge value={status === true ? 'visible' : 'hidden'} />
      )
    }
  ];

  const columnsToDisplay = {
    paint: paintColumns,
    experience: experienceColumns
  }[module]!;

  const filtersToDisplay = {
    paint: [
      {
        type: 'text',
        name: 'title',
        placeholder: 'placeholders.title'
      },
      {
        type: 'number',
        name: 'height',
        placeholder: 'placeholders.height'
      },
      {
        type: 'number',
        name: 'width',
        placeholder: 'placeholders.width'
      }
    ],
    experience: [
      {
        type: 'text',
        name: 'title',
        placeholder: 'placeholders.title'
      }
    ]
  }[module]! as InputProps[];

  const onSubmit = async (data: FieldValues) => {
    const cleanData = cleanObject(data);
    let newData = [];
    if (module === 'paint') {
      newData = await filterPaints(cleanData);
    } else newData = await filterExperiences(cleanData);
    setDataToShow(newData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.filters_container}>
          {filtersToDisplay.map((filter) => (
            <div key={filter.name} className={styles.filter_input}>
              <InputManager {...filter} input={filter} control={control} />
            </div>
          ))}
          <div className={styles.filter_btn}>
            <Button
              type="submit"
              variant="secondary"
              title="titles.filter"
              iconOnly
              icon={<FaMagnifyingGlass />}
            />
          </div>
        </div>
      </form>
      <DataTable
        columns={columnsToDisplay}
        data={dataToShow}
        responsive
        striped
        noDataComponent={
          <div className={styles.no_data}>{t('datatable_with_no_data')}</div>
        }
      />
    </>
  );
};

export default Table;
