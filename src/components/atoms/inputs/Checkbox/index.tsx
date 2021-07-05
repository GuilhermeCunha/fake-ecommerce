import React from 'react';

export type CheckboxProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
const Checkbox = ({ ...rest }: CheckboxProps) => {
  return (
    <label className="inline-flex items-center mt-3">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-gray-600"
        {...rest}
      />
    </label>
  );
};
export default Checkbox;
