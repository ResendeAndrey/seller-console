/*
  This component is a custom select component that uses React Hook Form to manage form state and validation.
  It takes a label, field name, control, and error prop and returns an input element with the appropriate attributes and styles.
*/

import { Control, FieldValues, Path, useController } from "react-hook-form";
type RHSelectProps<T extends FieldValues> =
  React.InputHTMLAttributes<HTMLSelectElement> & {
    fieldName: Path<T>;
    control: Control<T, unknown>;
    label?: string | React.ReactNode;
    error?: string;
    options?: string[];
  };
const Select = <T extends FieldValues>({
  label,
  fieldName,
  control,
  error,
  options,
  ...rest
}: RHSelectProps<T>) => {
  const { field } = useController({ control, name: fieldName });

  return (
    <div>
      {label && (
        <label className="mb-1 block text-sm font-medium">{label}</label>
      )}

      <select
        {...field}
        {...rest}
        className="p-2 border border-gray-300 rounded-md shadow-sm
               bg-white text-gray-900 placeholder-gray-400
               dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500
               focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
               transition w-full"
        id={fieldName}
        onChange={(e) => field.onChange(e.target.value)}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default Select;
