//* External
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
//* App Custom
import Button from '../Button/Button';
import { InputProps } from '../Inputs/Input/Input';
import InputManager from '../Inputs/InputManager/InputManager';
import { updatePainterGeneralData } from './requests';

export interface PainterGeneralDataProps {
  id: number;
  name: string;
  last_name: string;
  image: string;
  welcome_message: string;
  description: string;
}

interface Props {
  painter: PainterGeneralDataProps;
}

const PainterGeneralData = ({ painter }: Props) => {
  const router = useRouter();
  const t = useTranslations();
  const [doingRequest, setDoingRequest] = useState(false);
  const { control, formState, handleSubmit } = useForm({ mode: 'all' });

  const inputs: InputProps[] = [
    {
      type: 'text',
      name: 'name',
      label: 'labels.name',
      placeholder: 'placeholders.name',
      defaultValue: painter.name,
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    },
    {
      type: 'text',
      name: 'last_name',
      label: 'labels.last_name',
      placeholder: 'placeholders.last_name',
      defaultValue: painter.last_name,
      rules: {
        required: {
          value: true,
          message: 'form_errors.input_required'
        }
      }
    },
    {
      type: 'text',
      name: 'welcome_message',
      label: 'labels.welcome_message',
      placeholder: 'placeholders.welcome_message',
      defaultValue: painter.welcome_message,
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
      defaultValue: painter.description,
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

  const onSubmit = async (data: FieldValues) => {
    setDoingRequest(true);
    const formData = new FormData();
    Object.entries(data).map((field) => {
      formData.append(field[0], field[1]);
    });
    formData.append('painter_id', '1');
    const painter = await updatePainterGeneralData(formData);
    setDoingRequest(false);
    if (painter?.error_message) {
      toast(t(`toasts.${painter?.error_message}`), { type: 'error' });
    } else toast(t(`toasts.painter_general_data_updated`), { type: 'success' });
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {inputs.map((input) => (
        <InputManager key={input.name} input={input} control={control} />
      ))}
      <Button
        type="submit"
        text="buttons.submit"
        disabled={!formState.isValid || doingRequest}
        title={!formState.isValid ? 'titles.missing_inputs_required' : ''}
      />
    </form>
  );
};

export default PainterGeneralData;
