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
import InputSelect from '../InputSelect/InputSelect';
import InputTextArea from '../InputTextArea/InputTextArea';
import Modal from '../Modal/Modal';
import modalStyles from '../Modal/modal.module.css';
import ModalForm from '../ModalForm/ModalForm';
import { addStudy, deleteStudy, updateStudy } from './requests';
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

interface ConfirmationModalProps {
  show: boolean;
  study: number | null;
}

const PainterStudiesData = ({ studies }: Props) => {
  const router = useRouter();
  const t = useTranslations();
  const [doingRequest, setDoingRequest] = useState(false);
  const [showAddStudyModal, setShowAddStudyModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<ConfirmationModalProps>({
      show: false,
      study: null
    });
  const { control, formState, handleSubmit } = useForm({ mode: 'all' });
  const studiesArray = studies.map((category) => category.study).flat();

  const studyTypes = [
    { text: 'labels.education', value: 1 },
    { text: 'labels.work_experience', value: 2 }
  ];

  const onUpdateStudy = async ({
    pk,
    data
  }: {
    pk: number;
    data: FieldValues;
  }) => {
    data = {
      ...data,
      category_id: Number(data.category_id),
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
    } else {
      toast(t(`toasts.painter_study_deleted`), { type: 'success' });
      setShowConfirmationModal({ show: false, study: null });
    }
    router.refresh();
  };

  const onAddStudy = async (data: FieldValues) => {
    data = {
      ...data,
      category_id: Number(data.category_id),
      date_start: new Date(data.date_start).toISOString(),
      date_finish: new Date(data.date_finish).toISOString(),
      status: true
    };
    setDoingRequest(true);
    const study = await addStudy(data);
    setDoingRequest(false);
    if (study?.error_message) {
      toast(t(`toasts.${study?.error_message}`), { type: 'error' });
    } else {
      toast(t(`toasts.painter_study_added`), { type: 'success' });
      setShowAddStudyModal(false);
    }
    router.refresh();
  };

  const inputs = (study?: StudiesProps): InputProps[] => [
    {
      type: 'text',
      name: 'title',
      label: 'labels.title',
      placeholder: 'placeholders.title',
      defaultValue: study?.title,
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
      defaultValue: study?.subtitle,
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    },
    {
      type: 'select',
      name: 'category_id',
      label: 'labels.category',
      placeholder: 'placeholders.category',
      options: studyTypes,
      defaultValue: study?.category_id,
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
      defaultValue: study?.description,
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
      defaultValue: study && moment(study?.date_start).format('YYYY-MM-DD'),
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
      defaultValue: study && moment(study?.date_finish).format('YYYY-MM-DD'),
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    }
  ];

  return (
    <>
      {showAddStudyModal && (
        <ModalForm
          title="buttons.add_study"
          inputs={inputs}
          onSubmit={onAddStudy}
          onHide={() => setShowAddStudyModal(false)}
        />
      )}
      {showConfirmationModal.show && (
        <Modal
          title="confirmation.delete_study_title"
          description="confirmation.delete_study_desc"
          body={
            <div className={modalStyles.modalForm_btns}>
              <Button
                variant="secondary"
                text="buttons.close"
                onClick={() =>
                  setShowConfirmationModal({ show: false, study: null })
                }
                disabled={!formState.isValid || doingRequest}
              />
              <Button
                text="buttons.delete_study"
                disabled={doingRequest}
                onClick={() => onDeleteStudy(showConfirmationModal.study!)}
              />
            </div>
          }
          onHide={() => setShowConfirmationModal({ show: false, study: null })}
        />
      )}
      <Button
        variant="secondary"
        text="buttons.add_study"
        onClick={() => setShowAddStudyModal(true)}
      />
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
                } else if (input.type === 'select') {
                  inputToBeRendered = (
                    <InputSelect
                      key={input.name}
                      {...input}
                      control={control}
                    />
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
                  onClick={() =>
                    setShowConfirmationModal({ show: true, study: study.id })
                  }
                />
              </div>
            </form>
          </div>
        ))}
      </div>
    </>
  );
};

export default PainterStudiesData;
