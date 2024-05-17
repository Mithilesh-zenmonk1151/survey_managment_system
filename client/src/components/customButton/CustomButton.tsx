import React from 'react';
import Button from '@mui/material/Button';

interface CustomButtonProps {
  text: string;
  onClick: () => void;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  variant?: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  color = 'primary',
  variant = 'contained',
  disabled = false,
}) => {
  return (
    <Button color={color} variant={variant} onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  );
};

export default CustomButton;
