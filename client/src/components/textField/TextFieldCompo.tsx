import { Paper, Stack, TextField } from '@mui/material'
import React from 'react'
import { ChangeEvent } from 'react';

type TextFieldProps={
  placeholder?: string,
  value?: string,
  label?: string, // Changed to lowercase as per React conventions
  type?: string, 
  name?:string,
  nameT?:string,// Changed to lowercase as per React conventions
  customClassName?: string,
  handleOnChange?: React.ChangeEvent<HTMLInputElement>,
  setValue?: (value: string) => void
}

function TextFieldCompo(props: TextFieldProps) {
  const { value, placeholder, label, type, customClassName,name, nameT, setValue } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) {
      setValue(event.target.value);
    }
  };

  return (
    <Stack sx={{ marginTop: "22px" }}>
      <label className='label-input'  htmlFor={name}>{label}</label>
      <TextField
        placeholder={placeholder}
        name={nameT}
        value={value}
        type={type}
        onChange={handleChange}
        className={customClassName}
        sx={{
          paddingTop: "14px",
          color: "white"
        }}
      />
    </Stack>
  );
}

export default TextFieldCompo;
