import React from 'react';
import { Select as AntdSelect } from 'antd';
import { SelectValue } from 'antd/lib/select';
const { Option } = AntdSelect;

export type SelectOption = {
  name: string;
  value: string;
};

export type SelectProps = {
  options: SelectOption[];
  onChange?: (value: SelectValue) => void;
  value?: SelectValue;
  allowClear?: boolean;
  className?: string;
};
const Select = ({ options, ...rest }: SelectProps) => {
  return (
    <AntdSelect {...rest} placeholder={options[0]?.name}>
      {options.map(option => (
        <Option key={option.name} value={option.value}>
          {option.name}
        </Option>
      ))}
    </AntdSelect>
  );
};

export default Select;
