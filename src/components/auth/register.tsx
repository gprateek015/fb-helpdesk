import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { Form, SubmitHandler, useForm } from 'react-hook-form';
import { FormInput, FormLabel } from './styles';
import PasswordField from './password-field';
import { useDispatch } from '@/redux/store';
import { registerUser } from '@/actions/auth';

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

const Register = ({ loginForm }: { loginForm: Function }) => {
  const { control, register, handleSubmit } = useForm<RegisterData>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<RegisterData> = async data => {
    dispatch(registerUser(data));
  };

  return (
    <Form control={control}>
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '18px',
          mb: '20px'
        }}
      >
        Create Account
      </Typography>

      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}
      >
        <Box>
          <FormLabel>Name</FormLabel>
          <FormInput
            {...register('name', { required: 'Name is required' })}
            placeholder='John Doe'
          />
        </Box>
        <Box>
          <FormLabel>Email</FormLabel>
          <FormInput
            {...register('email', { required: 'Email is required' })}
            placeholder='johndoe@gmail.com'
          />
        </Box>
        <Box>
          <FormLabel>Password</FormLabel>
          <PasswordField
            {...register('password', { required: 'Password is required' })}
            placeholder='Enter unique password'
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <Checkbox
            sx={{
              p: 0
            }}
          />
          <Typography fontSize={'14px'}>Remember Me</Typography>
        </Box>
        <FormHelperText>{}</FormHelperText>
        <Button
          variant='contained'
          fullWidth
          type='submit'
          onSubmit={handleSubmit(onSubmit)}
        >
          Sign Up
        </Button>
        <Typography textAlign={'center'} fontSize={'14px'}>
          Already have an account?{' '}
          <Typography
            component={'span'}
            sx={{
              cursor: 'pointer',
              color: 'blue'
            }}
            fontSize={'14px'}
            onClick={() => loginForm()}
          >
            Login
          </Typography>
        </Typography>
      </Grid>
    </Form>
  );
};

export default Register;
