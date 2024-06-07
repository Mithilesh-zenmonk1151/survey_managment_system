import React from 'react';
import { Select, MenuItem } from '@mui/material';

interface CustomRowsPerPageDropdownProps {
  pageSize: number;
  onPageSizeChange: (newPageSize: number) => void;
  rowsPerPageOptions: number[];
}

const CustomRowsPerPageDropdown: React.FC<CustomRowsPerPageDropdownProps> = ({
  pageSize,
  onPageSizeChange,
  rowsPerPageOptions,
}) => {
  const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onPageSizeChange(Number(event.target.value));
  };

  return (
    <Select value={pageSize} onChange={handlePageSizeChange}>
      {rowsPerPageOptions.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomRowsPerPageDropdown;
