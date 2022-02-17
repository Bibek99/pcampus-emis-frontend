import { ChangeEventHandler } from 'react';

interface CustomTextArea {
  name: string;
  placeholder?: string;
  label: string;
  error?: string | object;
  touched?: boolean;
  required?: boolean;
  onChange?: ChangeEventHandler;
  value?: string;
  onBlur?: (e: any) => void;
}

export const CustomTextArea: React.FC<CustomTextArea> = ({
  name,
  placeholder,
  label,
  error,
  required,
  touched,
  onChange,
  onBlur,
  value,
}) => {
  return (
    <div className="flex w-full flex-col">
      <label htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        placeholder={placeholder}
        className="mt-2 h-32 w-full rounded-lg border border-gray-300 bg-gray-50 px-6 py-2 focus:outline-none focus:ring-2"
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {touched && error && (
        <span className="text-sm italic text-red-500">{error}</span>
      )}
    </div>
  );
};
