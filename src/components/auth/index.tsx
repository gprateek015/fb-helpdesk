'use client';

import { Dialog, Grid } from '@mui/material';
import React, { useState } from 'react';
import Login from './login';
import Register from './register';

const Auth = () => {
  const [page, setPage] = useState(0);

  const loginForm = () => {
    setPage(1);
  };
  const signupForm = () => {
    setPage(0);
  };

  return (
    <Dialog
      open={true}
      maxWidth='sm'
      PaperProps={{
        sx: {
          borderRadius: '25px',
          margin: '10px'
        }
      }}
    >
      <Grid
        p={{ xs: '20px 20px 30px', md: '40px 50px 30px' }}
        width={{ xs: 'calc(100vw - 30px)', md: '400px' }}
      >
        {page === 0 ? (
          <Register loginForm={loginForm} />
        ) : (
          <Login signupForm={signupForm} />
        )}
      </Grid>
    </Dialog>
  );
};

export default Auth;
