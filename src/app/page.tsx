'use client';

import Image from 'next/image';
import { Button, Grid } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Home() {
  const session = useSession();

  useEffect(() => {
    if (session.status === 'authenticated') {
      // dispatch(socialLogin({ ...session.data.user }));
      console.log(session);
    }
  }, [session]);

  return (
    <Grid>
      <Button onClick={() => signIn('facebook')}>Facebook</Button>
      <Button onClick={() => signOut()}>Logout</Button>
    </Grid>
  );
}
