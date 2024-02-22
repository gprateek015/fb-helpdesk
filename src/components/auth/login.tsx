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
import { loginUser } from '@/actions/auth';

type LoginData = {
  email: string;
  password: string;
};

const Login = ({ signupForm }: { signupForm: Function }) => {
  const { control, register, handleSubmit } = useForm<LoginData>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<LoginData> = async data => {
    await dispatch(loginUser(data));
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
        Login to your acconut
      </Typography>

      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}
      >
        <Box>
          <FormLabel>Email</FormLabel>
          <FormInput
            {...register('email', { required: 'Email is required!' })}
            placeholder='johndoe@gmail.com'
          />
        </Box>
        <Box>
          <FormLabel>Password</FormLabel>
          <PasswordField
            {...register('password', { required: 'Password is required!' })}
            placeholder='Enter your password'
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
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </Button>
        <Typography textAlign={'center'} fontSize={'14px'}>
          New to MyApp?{' '}
          <Typography
            component={'span'}
            sx={{
              cursor: 'pointer',
              color: 'blue'
            }}
            fontSize={'14px'}
            onClick={() => signupForm()}
          >
            Signup
          </Typography>
        </Typography>
      </Grid>
    </Form>
  );
};

export default Login;
