import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./DropDown.css";

type DropDownProps = {
  select_type?: string;
  options: Array<{ uuid: string; id: string; name: string; abbr: string }>;
  value?: string;
  onChange: (value: string) => void;
  id?: number;
  customClassDrop?: string;
};

export default function DropDown(props: DropDownProps) {
  const { select_type, options, value, onChange, customClassDrop } = props;

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl className={customClassDrop} sx={{ width: "400px", }}>
      <InputLabel>{select_type}</InputLabel>
      <Select
       labelId={`${select_type}-label`}
       id={`${select_type}-dropdown`}
        value={value || ""}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>{select_type}</em>
        </MenuItem>
        {options.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.name} {option.abbr}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
