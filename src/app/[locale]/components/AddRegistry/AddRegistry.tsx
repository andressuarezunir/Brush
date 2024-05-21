'use client';
//* External
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { FieldValues } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
//* App Custom
import Button from '../Button/Button';
import { InputProps } from '../Inputs/Input/Input';
import ModalForm from '../Modals/ModalForm/ModalForm';
import { addRegistry } from './requests';

interface Props {
  name: 'paint' | 'experience';
}

const addPaintInputs = (): InputProps[] => [
  {
    type: 'text',
    name: 'title',
    label: 'labels.title',
    placeholder: 'placeholders.title',
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
    placeholder: 'placeholders.image',
    rules: {
      required: {
        value: true,
        message: 'form_errors.input_required'
      }
    }
  }
];

const addExperienceInputs = (): InputProps[] => [
  {
    type: 'text',
    name: 'title',
    label: 'labels.title',
    placeholder: 'placeholders.title',
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
    type: 'dropzone',
    name: 'image',
    label: 'labels.image',
    placeholder: 'placeholders.image',
    rules: {
      required: {
        value: true,
        message: 'form_errors.input_required'
      }
    }
  }
];

const AddRegistry = ({ name }: Props) => {
  const router = useRouter();
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);

  const inputsToDisplay = {
    paint: addPaintInputs,
    experience: addExperienceInputs
  }[name];

  const onAddSubmit = async (data: FieldValues) => {
    if (name === 'paint') {
      data = {
        ...data,
        date_start: new Date(data.date_start).toISOString(),
        date_finish: new Date(data.date_finish).toISOString()
      };
    }
    const formData = new FormData();
    Object.entries(data).map((field) => {
      formData.append(field[0], field[1]);
    });
    const request = await addRegistry(name, formData);
    if (request?.error_message) {
      toast(t(`toasts.${request?.error_message}`), { type: 'error' });
    } else {
      toast(t(`toasts.${name}_added`), { type: 'success' });
      setShowModal(false);
      startTransition(() => {
        router.refresh();
      });
    }
  };

  return (
    <>
      {showModal && (
        <ModalForm
          title={`buttons.add_${name}`}
          inputs={inputsToDisplay}
          onSubmit={onAddSubmit}
          onHide={() => setShowModal(false)}
        />
      )}
      <Button
        text={`buttons.add_${name}`}
        disabled={isPending}
        icon={<FaPlus />}
        onClick={() => setShowModal(true)}
      />
    </>
  );
};

export default AddRegistry;
