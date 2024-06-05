import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import "./CheckBoxDropDown.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Option {
  id?: string;
  name?: string;
  value?: string;
  abbr?: string;
}

interface CheckBoxDropDownProps {
  options?: Option[];
  value?: string[];
  onChange: (value: string[]) => void;
  select_type: string;
  em?: string;
  em_name?: string;
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CheckBoxDropDown(props: CheckBoxDropDownProps) {
  const { options = [], value = [], onChange, select_type, em, em_name } = props;
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>(value);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === 'string' ? value.split(',') : value;
    setPersonName(newValue);
    onChange(newValue);
  };
  console.log("OPTIONSSS",options);

  return (
    <div>
      <FormControl sx={{ mt: -1, width: 200, borderRadius: "300px" }}>
        <Select
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput className="outlined-input-custom" />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em className='em-c'>{em_name}</em>;
            }
            return `${selected.length} selected`;
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            bgcolor: "#f5f5f5",
            width: "fit-content",
            height: "38px",
            border: "none",
            borderRadius: "40px",
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
            },
          }}
          label={select_type}
        >
          <MenuItem disabled value="">
            <em>{em}</em>
          </MenuItem>
          {options?.map((option) => (
            <MenuItem key={option?.id} value={option?.abbr}>
              <Checkbox checked={personName.indexOf(option?.abbr || '') > -1} />
              <ListItemText primary={option?.abbr} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
