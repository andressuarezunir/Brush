//* External
import { Control } from 'react-hook-form';
//* App Custom
import Input, { InputProps } from '../Input/Input';
import InputDropzone from '../InputDropzone/InputDropzone';
import InputSelect from '../InputSelect/InputSelect';
import InputTextArea from '../InputTextArea/InputTextArea';

interface InputManagerProps {
  input: InputProps;
  control: Control;
}

const InputManager = ({ input, control }: InputManagerProps) => {
  let inputToBeRendered;
  if (input.type === 'textarea') {
    inputToBeRendered = (
      <InputTextArea key={input.name} {...input} control={control} />
    );
  } else if (['text', 'number', 'password', 'date'].includes(input.type)) {
    inputToBeRendered = <Input key={input.name} {...input} control={control} />;
  } else if (input.type === 'select') {
    inputToBeRendered = (
      <InputSelect key={input.name} {...input} control={control} />
    );
  } else if (input.type === 'dropzone') {
    inputToBeRendered = (
      <InputDropzone key={input.name} {...input} control={control} />
    );
  }
  return inputToBeRendered;
};

export default InputManager;
