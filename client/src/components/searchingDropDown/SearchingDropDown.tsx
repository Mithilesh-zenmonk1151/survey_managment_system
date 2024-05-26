import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./SearchingDropDown.css";

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
}

interface DropDownForEditSurveyProps {
  options?: Option[];
  value?: string;
  onChange: (value: string) => void;
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

export default function SearchingDropDown(props: DropDownForEditSurveyProps) {
  const { options, value, onChange, select_type, em, em_name } = props;
  const theme = useTheme();
  const [selectedValue, setSelectedValue] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedValue(typeof value === 'string' ? value.split(',') : value);
    onChange(value as string); // Call onChange with the selected value
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 125, mt: 0 }}>
        <Select
          multiple
          displayEmpty
          value={selectedValue}
          onChange={handleChange}
          input={<OutlinedInput className="outlined-input-custom" />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em className='em-c'>{em_name}</em>;
            }
            return selected.join(', '); // Display selected values
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            bgcolor: "#f5f5f5",
            width: "fit-content",
            height: "32px",
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
            <MenuItem key={option.id} value={option.name} style={getStyles(option.name!, selectedValue, theme)}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
