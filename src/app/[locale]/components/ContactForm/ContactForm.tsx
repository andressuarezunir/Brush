'use client';
//* External
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
//* App Custom
import Button from '../Button/Button';
import { InputProps } from '../Inputs/Input/Input';
import InputManager from '../Inputs/InputManager/InputManager';
import styles from './contact.module.css';
import { createContactRegistry } from './request';

const ContactForm = () => {
  const t = useTranslations();
  const { control, formState, handleSubmit } = useForm({ mode: 'all' });
  const [doingRequest, setDoingRequest] = useState(false);
  const [formCounter, setFormCounter] = useState(0);
  const contactInputs = [
    {
      type: 'text',
      name: 'name',
      label: 'labels.name',
      placeholder: 'placeholders.name',
      rules: { required: { value: true } }
    },
    {
      type: 'text',
      name: 'email',
      label: 'labels.email',
      placeholder: 'placeholders.email',
      rules: {
        required: { value: true },
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'form_errors.email_pattern'
        }
      }
    },
    {
      type: 'text',
      name: 'motive',
      label: 'labels.reason',
      placeholder: 'placeholders.reason',
      rules: { required: { value: true } }
    },
    {
      type: 'textarea',
      name: 'message',
      label: 'labels.message',
      placeholder: 'placeholders.message',
      rules: { required: { value: true } }
    }
  ] as InputProps[];

  const onSubmit = async (data: FieldValues) => {
    setDoingRequest(true);
    const contact = await createContactRegistry(data);
    setDoingRequest(false);
    if (contact?.error_message) {
      toast(t(`toasts.${contact?.error_message}`), { type: 'error' });
    } else {
      toast(t('toasts.contact_form_registry_saved'), { type: 'success' });
      setFormCounter(formCounter + 1);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form_container}
      key={formCounter}
    >
      {contactInputs.map((input) => (
        <div key={input.name}>
          <InputManager input={input} control={control} />
        </div>
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

export default ContactForm;
