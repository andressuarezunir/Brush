'use client';
//* External
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { FaFileUpload } from 'react-icons/fa';
//* App Custom
import Dropzone, { FileWithPath } from 'react-dropzone';
import { InputProps } from '../Input/Input';
import styles from '../Input/input.module.css';
import dropzoneStyles from './inputDropzone.module.css';

const InputDropzone = ({
  name,
  label,
  placeholder,
  defaultValue,
  rules = {},
  control
}: InputProps) => {
  const t = useTranslations();
  const [fileSelected, setFileSelected] = useState<FileWithPath | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      shouldUnregister={true}
      defaultValue={defaultValue}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <div key={name} className={styles.input_container}>
          <label className={styles.input_label}>
            {label && t(label)}
            {rules?.required?.value && (
              <span className={styles.required_symbol}>*</span>
            )}
          </label>
          <Dropzone
            accept=".jpg, .png"
            onDrop={(files) => {
              setFileSelected(files[0]);
              onChange(files[0]);
            }}
            noDrag
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className={dropzoneStyles.input_dropzone}
              >
                <input {...getInputProps()} hidden />
                <div className={dropzoneStyles.icon_container}>
                  <FaFileUpload />
                </div>
                {!fileSelected ? t(placeholder) : <>{fileSelected?.path}</>}
              </div>
            )}
          </Dropzone>
          {error?.message && (
            <p className={styles.error_message}>{t(error?.message)}</p>
          )}
        </div>
      )}
    />
  );
};

export default InputDropzone;
