'use client';
//* External
import moment from 'moment-timezone';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FieldValues, useForm } from 'react-hook-form';
import { FaPencilAlt } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
//* App Custom
import { cleanObject } from '@/app/helpers/cleanObject';
import Badge from '../Badge/Badge';
import Button from '../Button/Button';
import Input, { InputProps } from '../Input/Input';
import { filterPaints } from './requests';
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
  const { control, handleSubmit } = useForm({ mode: 'all' });
  const [dataToShow, setDataToShow] = useState(data);

  const paintColumns: Column<T>[] = [
    {
      name: t('labels.actions'),
      cell: (paint) => (
        <Button
          variant="secondary"
          title="titles.update_paint"
          iconOnly
          icon={<FaPencilAlt />}
          onClick={() => {}}
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

  const columnsToDisplay = {
    paint: paintColumns,
    experience: []
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
    experience: []
  }[module]! as InputProps[];

  const onSubmit = async (data: FieldValues) => {
    const cleanData = cleanObject(data);
    const paints = await filterPaints(cleanData);
    setDataToShow(paints);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.filters_container}>
          {filtersToDisplay.map((filter) => (
            <div key={filter.name} className={styles.filter_input}>
              <Input {...filter} control={control} />
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
        noDataComponent={<p>{t('datatable_with_no_data')}</p>}
      />
    </>
  );
};

export default Table;