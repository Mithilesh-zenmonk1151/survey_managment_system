import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

interface Option {
  id: string;
  name: string;
  value: string;
}

interface DropDownForEditSurveyProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  select_type: string;
}

const DropDownForEditSurvey: React.FC<DropDownForEditSurveyProps> = ({
  options,
  value,
  onChange,
  select_type,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value); // Directly pass the value from SelectChangeEvent
  };

  return (
    <FormControl size="small" sx={{ width: "90%", borderRadius: "80px" }}>
      <InputLabel id={`${select_type}-label`}>{select_type}</InputLabel>
      <Select
        labelId={`${select_type}-label`}
        id={`${select_type}-dropdown`}
        value={value}
        onChange={handleChange}
        label={select_type}
        sx={{ borderRadius: "8px" }}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDownForEditSurvey;
