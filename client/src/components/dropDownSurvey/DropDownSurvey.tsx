import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import "./DropDown.css";

type DropDownProps = {
  select_type?: string;
  options: Array<{ uuid: string; id: string; name: string; abbr: string }>;
  value?: string;
  onChange: (value: string) => void;
  id?:number,
  customClassDrop?:string
};

export default function DropDownSurvey(props: DropDownProps) {
  const { select_type, options, value, onChange,customClassDrop} = props;

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ width: "400px", height: "40px" }} className={customClassDrop}>
      <InputLabel>{select_type}</InputLabel>
      <Select
        value={value || ""}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>{select_type}</em>
        </MenuItem>
        {options.map(option => (
          <MenuItem key={option.id} value={option.name} >
            {option.name}  {option.abbr}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
