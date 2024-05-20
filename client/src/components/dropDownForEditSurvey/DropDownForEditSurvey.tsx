// components/CustomDropdown.tsx
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  handleChange?: (event: SelectChangeEvent<string>) => void;
}

const DropDownForEditSurvey: React.FC<CustomDropdownProps> = ({
  options,
  value,
  handleChange,
}) => {
  return (
    <FormControl  size="small" sx={{
        width:"100px",
        borderRadius:"80px"
    }}>
      <InputLabel id="dropdown-label">Select</InputLabel>
      <Select
        labelId="dropdown-label"
        id="dropdown"
        value={value}
        onChange={handleChange}
        label="Select"
        sx={{ borderRadius: '8px' }} // Customize border radius here
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDownForEditSurvey;
