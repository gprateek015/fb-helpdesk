import { Message } from '@/redux/slice/conversation';
import { useSelector } from '@/redux/store';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ProfileImg from '@/assets/profile.jpg';
import moment from 'moment';

const MessageBox = ({
  messages,
  msg_by,
  timestamps,
  name
}: {
  messages: string[];
  msg_by: Message['msg_by'];
  timestamps: string[];
  name: string;
}) => {
  const {
    customer: { profile_pic }
  } = useSelector(state => state.conversation);
  const [showTimestampMsgInd, setShowTimestampMsgInd] = useState(-1);

  useEffect(() => {
    if (timestamps?.length > 0) {
      setShowTimestampMsgInd(timestamps.length - 1);
    }
  }, [timestamps]);

  return (
    <Grid
      width='100%'
      sx={{
        display: 'flex',
        flexDirection: msg_by === 'customer' ? 'row' : 'row-reverse',
        gap: '10px',
        alignItems: 'center'
      }}
    >
      <Image
        src={ProfileImg}
        alt='profile'
        height={30}
        width={30}
        style={{
          borderRadius: '50%',
          alignSelf: 'flex-end',
          marginBottom: '25px'
        }}
      />

      <Grid>
        <Grid sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          {messages.map((messaage, ind) => (
            <Grid key={ind}>
              <Typography
                onClick={() => setShowTimestampMsgInd(ind)}
                sx={{
                  background: 'white',
                  padding: '7px 10px',
                  borderRadius: '5px',
                  boxShadow: '0px 0px 10px 0px #00000021',
                  fontSize: '15px',
                  cursor: 'pointer'
                }}
              >
                {messaage}
              </Typography>
              {showTimestampMsgInd === ind && (
                <Box
                  fontSize={'12px'}
                  sx={{
                    display: 'flex',
                    gap: '5px',
                    mt: '5px'
                  }}
                >
                  <Typography fontSize={'11px'}>{name} •</Typography>
                  <Typography fontSize={'11px'}>
                    {moment(new Date(Number(timestamps[ind]))).format(
                      'MMM DD, hh:mm A'
                    )}
                  </Typography>
                </Box>
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MessageBox;
