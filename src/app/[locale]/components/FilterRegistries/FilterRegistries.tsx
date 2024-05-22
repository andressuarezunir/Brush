'use client';
//* External
import { FieldValues, useForm } from 'react-hook-form';
import { FaMagnifyingGlass } from 'react-icons/fa6';
//* App Custom
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Button from '../Button/Button';
import { InputProps } from '../Inputs/Input/Input';
import InputManager from '../Inputs/InputManager/InputManager';
import styles from './filters.module.css';

interface Props {
  module: 'paint' | 'experience';
}

const FilterRegistries = ({ module }: Props) => {
  const { control, formState, handleSubmit } = useForm({ mode: 'all' });
  const router = useRouter();
  const locale = useLocale();

  const filtersToDisplay = [
    {
      type: 'text',
      name: 'title',
      placeholder: 'placeholders.title'
    }
  ] as InputProps[];

  const onSubmit = async (data: FieldValues) => {
    let url = `/${locale}/${module}s`;
    if (data?.title) url = `/${locale}/${module}s?title=${data.title}`;
    router.replace(url);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.filters_form_input_wrapper}>
          {filtersToDisplay.map((input) => (
            <div key={input.name} className={styles.filters_form_input}>
              <InputManager input={input} control={control} />
            </div>
          ))}
          <div className={styles.filters_form_button}>
            <Button
              variant="secondary"
              type="submit"
              icon={<FaMagnifyingGlass />}
              disabled={!formState.isValid}
              title="titles.filter"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default FilterRegistries;
