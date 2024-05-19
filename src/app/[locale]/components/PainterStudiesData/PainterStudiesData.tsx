//* External
import moment from 'moment-timezone';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
//* App Custom
import { useTranslations } from 'next-intl';
import Button from '../Button/Button';
import Input, { InputProps } from '../Input/Input';
import InputTextArea from '../InputTextArea/InputTextArea';
import { deleteStudy, updateStudy } from './requests';
import styles from './studies.module.css';

interface StudiesProps {
  id: number;
  status: boolean;
  title: string;
  subtitle: string;
  description: string;
  date_start: Date;
  date_finish: Date;
  category_id: number;
}

export interface PainterStudiesProps {
  id: number;
  name: string;
  study: StudiesProps[];
}

interface Props {
  studies: PainterStudiesProps[];
}

const PainterStudiesData = ({ studies }: Props) => {
  const router = useRouter();
  const t = useTranslations();
  const [doingRequest, setDoingRequest] = useState(false);
  const { control, formState, handleSubmit } = useForm({ mode: 'all' });
  const studiesArray = studies.map((category) => category.study).flat();

  const onUpdateStudy = async ({
    pk,
    data
  }: {
    pk: number;
    data: FieldValues;
  }) => {
    data = {
      ...data,
      date_start: new Date(data.date_start).toISOString(),
      date_finish: new Date(data.date_finish).toISOString()
    };
    setDoingRequest(true);
    const study = await updateStudy({ pk, data });
    setDoingRequest(false);
    if (study?.error_message) {
      toast(t(`toasts.${study?.error_message}`), { type: 'error' });
    } else toast(t(`toasts.painter_study_updated`), { type: 'success' });
    router.refresh();
  };

  const onDeleteStudy = async (pk: number) => {
    setDoingRequest(true);
    const study = await deleteStudy(pk);
    setDoingRequest(false);
    if (study?.error_message) {
      toast(t(`toasts.${study?.error_message}`), { type: 'error' });
    } else toast(t(`toasts.painter_study_deleted`), { type: 'success' });
    router.refresh();
  };

  const inputs = (study: StudiesProps): InputProps[] => [
    {
      type: 'text',
      name: 'title',
      label: 'labels.title',
      placeholder: 'placeholders.title',
      defaultValue: study.title,
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    },
    {
      type: 'text',
      name: 'subtitle',
      label: 'labels.subtitle',
      placeholder: 'placeholders.subtitle',
      defaultValue: study.subtitle,
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    },
    {
      type: 'text',
      name: 'category_id',
      label: 'labels.category',
      placeholder: 'placeholders.category',
      defaultValue: study.category_id,
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'labels.description',
      placeholder: 'placeholders.description',
      defaultValue: study.description,
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    },
    {
      type: 'date',
      name: 'date_start',
      label: 'labels.date_start',
      defaultValue: moment(study.date_start).format('YYYY-MM-DD'),
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    },
    {
      type: 'date',
      name: 'date_finish',
      label: 'labels.date_finish',
      defaultValue: moment(study.date_finish).format('YYYY-MM-DD'),
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    }
  ];

  return (
    <div className={styles.patient_studies}>
      {studiesArray.map((study) => (
        <div key={study.id} className={styles.patient_study}>
          <form
            onSubmit={handleSubmit((data) =>
              onUpdateStudy({ pk: study.id, data })
            )}
          >
            {inputs(study).map((input) => {
              let inputToBeRendered;
              if (input.type === 'textarea') {
                inputToBeRendered = (
                  <InputTextArea
                    key={input.name}
                    {...input}
                    control={control}
                  />
                );
              } else if (['text', 'date'].includes(input.type)) {
                inputToBeRendered = (
                  <Input key={input.name} {...input} control={control} />
                );
              }
              return inputToBeRendered;
            })}
            <div className={styles.patient_study_buttons}>
              <Button
                type="submit"
                text="buttons.update_study"
                disabled={!formState.isValid || doingRequest}
              />
              <Button
                text="buttons.delete_study"
                variant="secondary"
                disabled={doingRequest}
                onClick={() => onDeleteStudy(study.id)}
              />
            </div>
          </form>
        </div>
      ))}
    </div>
  );
};

export default PainterStudiesData;
