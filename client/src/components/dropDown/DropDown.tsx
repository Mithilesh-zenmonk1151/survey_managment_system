import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./DropDown.css"
export default function DropDown() {
//   const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    // setAge(event.target.value);
  };

  return (
      <FormControl sx={{ width:"90px", height:"50px"}} className='header-drop'>
        <Select
          
        //   value={age}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem>
        </Select>
      </FormControl>
  );
}
