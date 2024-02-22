'use client';

import { Grid, Typography, Box, Button } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import ProfileJPG from '@/assets/profile.jpg';
import CallIcon from '@mui/icons-material/CallSharp';
import AccountIcon from '@mui/icons-material/AccountCircleSharp';
import { useSelector } from '@/redux/store';

const UserProfile = () => {
  const { customer } = useSelector(state => state.conversation);
  return (
    <Grid
      width={'300px'}
      sx={{
        border: '1px solid #dedede',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Grid
        sx={{
          padding: '20px 20px 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center'
        }}
      >
        <Image
          // src={customer.profile_pic || ProfileJPG}
          src={ProfileJPG}
          height={80}
          width={80}
          alt='Profile Pic'
          style={{
            borderRadius: '50%'
          }}
        />
        <Box textAlign={'center'}>
          <Typography fontWeight={'600'} fontSize={'18px'}>
            {`${customer?.first_name} ${customer?.last_name}`}
          </Typography>
          <Typography color='#7b7b7b' fontSize={'14px'}>
            • Offline
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '20px'
          }}
        >
          <Button
            variant='outlined'
            sx={{
              color: '#7b7b7b',
              borderColor: '#7b7b7b',
              fontSize: '12px',
              fontWeight: '600',
              '&:hover': {
                color: '#7b7b7b',
                borderColor: '#7b7b7b'
              }
            }}
            startIcon={<CallIcon />}
          >
            Call
          </Button>
          <Button
            variant='outlined'
            sx={{
              color: '#7b7b7b',
              borderColor: '#7b7b7b',
              fontSize: '12px',
              fontWeight: '600',
              '&:hover': {
                color: '#7b7b7b',
                borderColor: '#7b7b7b'
              }
            }}
            startIcon={<AccountIcon />}
          >
            Profile
          </Button>
        </Box>
      </Grid>
      <Grid
        flexGrow={1}
        sx={{
          background: '#dadfe7',
          padding: '10px'
        }}
      >
        <Grid
          sx={{
            border: '1px solid #dedede',
            borderRadius: '10px',
            padding: '10px 15px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            background: 'white',
            boxShadow: '0px 1px 3px 0px #00000021'
          }}
        >
          <Typography fontWeight={'600'}>Customer details</Typography>
          {customer?.email && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Typography fontSize={'14px'}>Email</Typography>
              <Typography fontWeight={'600'} fontSize={'14px'}>
                some@gmail.com
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography fontSize={'14px'}>First Name</Typography>
            <Typography fontWeight={'600'} fontSize={'14px'}>
              {customer?.first_name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography fontSize={'14px'}>Last Name</Typography>
            <Typography fontWeight={'600'} fontSize={'14px'}>
              {customer?.last_name}
            </Typography>
          </Box>
          <Typography
            sx={{
              cursor: 'pointer',
              fontWeight: '600',
              color: '#25507b',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            View more details
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
