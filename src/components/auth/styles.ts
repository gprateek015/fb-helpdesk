'use client';

import { TextField, Typography, styled } from '@mui/material';

export const FormInput = styled(TextField)({
  width: '100%',
  '& .MuiInputBase-root': {
    border: '1px solid #DDD',
    borderRadius: '4px'
  },

  '& input,textarea': {
    color: 'black',
    fontSize: '14px',
    padding: '12px 16px'
  }
});

export const FormLabel = styled(Typography)({
  fontWeight: '600',
  fontSize: '14px'
});
