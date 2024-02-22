import { Grid, IconButton } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AcUnitIcon from '@mui/icons-material/AcUnit';

import ProfileImg from '@/assets/profile.jpg';
import Logo from '@/assets/logo.png';
import Image from 'next/image';

export default function Layout({
  children,
  allconvo,
  userprofile
}: Readonly<{
  children: React.ReactNode;
  allconvo: React.ReactNode;
  userprofile: React.ReactNode;
}>) {
  return (
    <Grid
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex'
      }}
    >
      <Grid
        width={'70px'}
        height={'100%'}
        sx={{
          background: '#0a4d90',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
            width: '100%',
            mt: '10px'
          }}
        >
          {/* <IconButton
            sx={{
              height: '60px',
              borderRadius: '0px',
              width: '100%'
            }}
          >
            <AcUnitIcon sx={{ color: 'white' }} />
          </IconButton> */}
          <Image src={Logo} alt='logo' width={60} height={60} />
          <IconButton
            sx={{
              height: '60px',
              background: 'white',
              borderRadius: '0px',
              width: '100%',
              '&:hover': {
                background: 'white'
              }
            }}
          >
            <InboxIcon sx={{ color: '#0a4d90' }} />
          </IconButton>
          <IconButton
            sx={{
              height: '60px',
              borderRadius: '0px',
              width: '100%'
            }}
          >
            <GroupIcon sx={{ color: 'white' }} />
          </IconButton>
          <IconButton
            sx={{
              height: '60px',
              borderRadius: '0px',
              width: '100%'
            }}
          >
            <TrendingUpIcon sx={{ color: 'white' }} />
          </IconButton>
        </Grid>
        <Grid p='15px 0px'>
          <Image
            src={ProfileImg}
            alt='profile'
            width={40}
            height={40}
            style={{
              borderRadius: '50%'
            }}
          />
        </Grid>
      </Grid>
      {allconvo}
      {children}
      {userprofile}
    </Grid>
  );
}
