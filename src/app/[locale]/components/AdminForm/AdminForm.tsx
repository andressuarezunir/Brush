'use client';
//* External
import moment from 'moment-timezone';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
//* App Custom
import { cleanObject } from '@/app/helpers/cleanObject';
import {
  Experience,
  ExperienceCategory,
  Paint,
  PaintCategory
} from '@prisma/client';
import Button from '../Button/Button';
import { InputProps } from '../Inputs/Input/Input';
import InputManager from '../Inputs/InputManager/InputManager';
import ConfirmationModal from '../Modal/ConfirmationModal';
import styles from './adminForm.module.css';
import { deleteRegistry, updateRegistry } from './requests';

interface PaintProps extends Paint {
  categories: { category: PaintCategory }[];
}

interface ExperienceProps extends Experience {
  categories: { category: ExperienceCategory }[];
}

interface Props {
  module: 'paint' | 'experience';
  defaultData: PaintProps | ExperienceProps;
}

const AdminForm = ({ module, defaultData }: Props) => {
  const router = useRouter();
  const t = useTranslations();
  const localeActive = useLocale();
  const [isPending, startTransition] = useTransition();
  const { control, formState, handleSubmit } = useForm({ mode: 'all' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const paintInputs = (defaultData: PaintProps): InputProps[] => [
    {
      type: 'text',
      name: 'title',
      label: 'labels.title',
      placeholder: 'placeholders.title',
      defaultValue: defaultData.title,
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
      defaultValue: moment(defaultData.date_start).format('YYYY-MM-DD'),
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
      defaultValue: moment(defaultData.date_finish).format('YYYY-MM-DD'),
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    },
    {
      type: 'number',
      name: 'height',
      label: 'labels.height',
      placeholder: 'placeholders.height',
      defaultValue: defaultData.height,
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    },
    {
      type: 'number',
      name: 'width',
      label: 'labels.width',
      placeholder: 'placeholders.width',
      defaultValue: defaultData.width,
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    },
    {
      type: 'select',
      name: 'status',
      label: 'labels.status',
      placeholder: 'placeholders.status',
      defaultValue: defaultData.status === true ? 1 : 2,
      options: [
        { text: 'visible', value: 1 },
        { text: 'hidden', value: 2 }
      ],
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    },
    {
      type: 'select',
      name: 'on_sale',
      label: 'labels.on_sale',
      placeholder: 'placeholders.on_sale',
      defaultValue: defaultData.on_sale === true ? 1 : 2,
      options: [
        { text: 'on_sale', value: 1 },
        { text: 'not_on_sale', value: 2 }
      ],
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    },
    {
      type: 'select',
      name: 'categories',
      label: 'labels.category',
      placeholder: 'placeholders.category',
      defaultValue: defaultData.categories[0].category.id,
      options: [
        { text: 'labels.abstract', value: 1 },
        { text: 'labels.oil_painting', value: 2 },
        { text: 'labels.creativity', value: 3 }
      ],
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    },
    {
      type: 'dropzone',
      name: 'image',
      label: 'labels.image',
      placeholder: 'placeholders.image'
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'labels.description',
      placeholder: 'placeholders.description',
      defaultValue: defaultData.description,
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    }
  ];

  const experienceInputs = (defaultData: ExperienceProps): InputProps[] => [
    {
      type: 'text',
      name: 'title',
      label: 'labels.title',
      placeholder: 'placeholders.title',
      defaultValue: defaultData.title,
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    },
    {
      type: 'date',
      name: 'date_updated',
      label: 'labels.date_updated',
      defaultValue: moment(defaultData.date_updated).format('YYYY-MM-DD')
    },
    {
      type: 'select',
      name: 'categories',
      label: 'labels.category',
      placeholder: 'placeholders.category',
      defaultValue: defaultData.categories[0].category.id,
      options: [
        { text: 'labels.materials', value: 1 },
        { text: 'labels.autonomy', value: 2 },
        { text: 'labels.technique', value: 3 }
      ],
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    },
    {
      type: 'select',
      name: 'status',
      label: 'labels.status',
      placeholder: 'placeholders.status',
      defaultValue: defaultData.status === true ? 1 : 2,
      options: [
        { text: 'visible', value: 1 },
        { text: 'hidden', value: 2 }
      ],
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
      defaultValue: defaultData.description,
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    },
    {
      type: 'dropzone',
      name: 'image',
      label: 'labels.image',
      placeholder: 'placeholders.image'
    }
  ];

  const inputsToRender = {
    paint: paintInputs(defaultData as PaintProps),
    experience: experienceInputs(defaultData as ExperienceProps)
  }[module];

  const onSubmit = async (data: FieldValues) => {
    if (module === 'paint') {
      data = {
        ...data,
        date_start: new Date(data.date_start).toISOString(),
        date_finish: new Date(data.date_finish).toISOString()
      };
    }
    const formData = new FormData();
    Object.entries(cleanObject(data)).map((field) => {
      formData.append(field[0], field[1]);
    });
    const request = await updateRegistry(module, defaultData.id, formData);
    if (request?.error_message) {
      toast(t(`toasts.${request?.error_message}`), { type: 'error' });
    } else {
      toast(t(`toasts.${module}_updated`), { type: 'success' });
      startTransition(() => {
        router.refresh();
      });
    }
  };

  const onDelete = async () => {
    const id = defaultData.id;
    const request = await deleteRegistry(module, id);
    if (request?.error_message) {
      toast(t(`toasts.${request?.error_message}`), { type: 'error' });
    } else {
      toast(t(`toasts.${module}_deleted`), { type: 'success' });
      startTransition(() => {
        router.replace(
          `/${localeActive}/admin/dashboard/${
            module === 'paint' ? 'paints' : 'experiences'
          }`
        );
      });
    }
  };

  return (
    <>
      {showDeleteModal && (
        <ConfirmationModal
          title={`confirmation.delete_${module}_title`}
          description={`confirmation.delete_${module}_desc`}
          doingRequest={isPending}
          onSubmit={onDelete}
          onHide={() => setShowDeleteModal(false)}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.admin_form_input_wrapper}>
          {inputsToRender.map((input) => (
            <div key={input.name} className={styles.admin_form_input}>
              <InputManager input={input} control={control} />
            </div>
          ))}
        </div>
        <div className={styles.admin_form_buttons}>
          <Button
            type="submit"
            text={`buttons.update_${module}`}
            disabled={!formState.isValid || isPending}
            title={!formState.isValid ? 'titles.missing_inputs_required' : ''}
          />
          <Button
            variant="secondary"
            text={`buttons.delete_${module}`}
            icon={<FaTrash />}
            disabled={isPending}
            onClick={() => setShowDeleteModal(true)}
          />
        </div>
      </form>
    </>
  );
};

export default AdminForm;
