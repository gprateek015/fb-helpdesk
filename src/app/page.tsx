'use client';

import Image from 'next/image';
import { Button, Grid } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Auth from '@/components/auth';
import FBPageConnect from '@/components/page-connect';
import { useDispatch, useSelector } from '@/redux/store';
import { autoLogin } from '@/utils';
import { useRouter } from 'next/navigation';
import { clearPrevPath } from '@/redux/slice/user';

export default function Home() {
  const dispatch = useDispatch();
  const { isLoggedin, previousPath } = useSelector(state => state.user);
  const router = useRouter();

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      router.push(previousPath || '/');
      dispatch(clearPrevPath());
    }
  }, [isLoggedin]);

  return (
    <Grid
      sx={{
        background: '#0a4d90',
        height: '100vh',
        width: '100vw',
        overflowX: 'hidden'
      }}
    >
      {isLoggedin ? <FBPageConnect /> : <Auth />}
    </Grid>
  );
}
