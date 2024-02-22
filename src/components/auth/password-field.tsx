'use client';

import React, { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { FormInput } from './styles';

type Props = {
  value?: string;
  onChange: React.ChangeEventHandler;
  onBlur?: React.ChangeEventHandler;
  name?: string;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
};

const PasswordField = React.forwardRef(
  (props: Props, ref: React.Ref<HTMLDivElement>) => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
      <FormInput
        {...props}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={() => setVisible(curr => !curr)}>
                {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          )
        }}
        ref={ref}
        type={visible ? 'text' : 'password'}
      />
    );
  }
);

PasswordField.displayName = 'PasswordField';

export default PasswordField;
