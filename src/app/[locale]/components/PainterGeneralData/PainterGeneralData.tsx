//* External
import { FieldValues, useForm } from 'react-hook-form';
//* App Custom
import { PainterProps } from '../../admin/dashboard/painter/page';
import Button from '../Button/Button';
import Input, { InputProps } from '../Input/Input';
import InputTextArea from '../InputTextArea/InputTextArea';

interface PainterGeneralDataProps {
  painter: PainterProps;
}

const PainterGeneralData = ({ painter }: PainterGeneralDataProps) => {
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
    }
  ];

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {inputs.map((input) => {
        let inputToBeRendered;
        if (input.type === 'textarea') {
          inputToBeRendered = (
            <InputTextArea key={input.name} {...input} control={control} />
          );
        } else if (input.type === 'text') {
          inputToBeRendered = (
            <Input key={input.name} {...input} control={control} />
          );
        }
        return inputToBeRendered;
      })}
      <Button
        type="submit"
        text="buttons.submit"
        disabled={!formState.isValid}
      />
    </form>
  );
};

export default PainterGeneralData;
