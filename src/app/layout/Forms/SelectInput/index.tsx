import { ChevronDownIcon } from '@heroicons/react/outline';
import { ChangeEventHandler } from 'react';

interface CustomSelectInput {
  name: string;
  placeholder?: string;
  label: string;
  error?: string | object;
  touched?: boolean;
  required?: boolean;
  onChange?: ChangeEventHandler;
  value?: string | number;
  onBlur?: (e: any) => void;
  options?: {
    name: string;
    value: string;
  }[];
}

export const CustomSelectInput: React.FC<CustomSelectInput> = ({
  name,
  placeholder,
  label,
  error,
  required,
  touched,
  onChange,
  onBlur,
  options,
}) => {
  return (
    <div className="flex w-full flex-col">
      <label htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          placeholder={placeholder}
          className="mt-2 h-12 w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 px-6 py-2 focus:outline-none focus:ring-2"
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={placeholder}
        >
          <option value={placeholder} disabled>
            {placeholder}
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <div className="pointer-events-none absolute top-6 right-0 flex items-center px-3 text-gray-700">
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </div>
      {touched && error && (
        <span className="text-sm italic text-red-500">{error}</span>
      )}
    </div>
  );
};
