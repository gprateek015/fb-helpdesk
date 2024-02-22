import { createPage, deletePage } from '@/actions/page';
import { clearPage } from '@/redux/slice/user';
import { useDispatch, useSelector } from '@/redux/store';
import { Button, Dialog, Grid, Typography } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const FBPageConnect = () => {
  const session = useSession();
  const router = useRouter();
  const fbConnected = session?.status === 'authenticated';
  const dispatch = useDispatch();
  const { page } = useSelector(state => state.user);

  useEffect(() => {
    if (fbConnected) {
      const {
        accessToken: access_token,
        user: { id: user_id }
      } = session.data as any;
      dispatch(createPage({ access_token, user_id }));
    } else {
      dispatch(clearPage());
    }
  }, [fbConnected, dispatch, session, session.data]);

  return (
    <Dialog
      open={true}
      maxWidth='sm'
      PaperProps={{
        sx: {
          borderRadius: '25px'
        }
      }}
    >
      <Grid p='40px 50px 30px' width={'400px'}>
        <Grid mb='20px'>
          <Typography textAlign={'center'} fontWeight={'600'} mb='5px'>
            Facebook Page Integration
          </Typography>
          {page?.page_id && (
            <Typography textAlign={'center'}>
              Integrated Page{' '}
              <Typography component='span' fontWeight={'600'}>
                {page?.name}
              </Typography>
            </Typography>
          )}
        </Grid>

        {!page?.page_id && (
          <Button
            variant='contained'
            fullWidth
            onClick={() => signIn('facebook')}
          >
            Connect Page
          </Button>
        )}

        {page?.page_id && (
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}
          >
            <Button
              variant='contained'
              color='warning'
              fullWidth
              onClick={() => {
                signOut({ redirect: false });
                dispatch(deletePage());
              }}
            >
              Delete Integration
            </Button>
            <Button
              variant='contained'
              fullWidth
              onClick={() => router.push('/conversations')}
            >
              Reply To Messages
            </Button>
          </Grid>
        )}
      </Grid>
    </Dialog>
  );
};

export default FBPageConnect;
