import React from 'react';
import Select from 'react-select';

interface CustomMultiSelectInput {
  name: string;
  placeholder?: string;
  label: string;
  error?: string | object;
  touched?: boolean;
  required?: boolean;
  onChange?: any;
  value?: string | number;
  onBlur?: (e: any) => void;
  options?: any;
}

export const CustomMultiSelectInput: React.FC<CustomMultiSelectInput> = ({
  name,
  placeholder,
  error,
  label,
  required,
  touched,
  onChange,
  options,
}) => {
  return (
    <div className="flex w-full flex-col">
      <label htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="">
        <Select
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          options={options}
          isMulti
          className="mt-2"
        />
      </div>
      {touched && error && (
        <span className="text-sm italic text-red-500">{error}</span>
      )}
    </div>
  );
};
