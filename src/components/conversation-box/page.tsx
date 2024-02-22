'use client';

import { Conversation, selectConversation } from '@/redux/slice/conversation';
import { Box, Checkbox, Grid, Typography } from '@mui/material';
import React from 'react';
import moment from 'moment';
import { useDispatch } from '@/redux/store';

const ConversationBox = ({
  active = false,
  conversation
}: {
  active?: boolean;
  conversation: Conversation;
}) => {
  const dispatch = useDispatch();
  return (
    <Grid
      sx={{
        padding: '15px',
        border: '1px solid #e6e6e6',
        background: active ? '#e2e2e2' : 'white',
        position: 'relative',
        cursor: 'pointer'
      }}
      onClick={() => dispatch(selectConversation(conversation?._id))}
    >
      <Typography
        sx={{
          position: 'absolute',
          top: '10px',
          right: '15px',
          fontSize: '12px',
          color: '#4b4b4b'
        }}
      >
        {moment(conversation.modified_at).fromNow()}
      </Typography>
      <Grid
        sx={{
          display: 'flex',
          gap: '10px'
        }}
      >
        <Checkbox
          sx={{
            p: '0',
            '&.Mui-checked': {
              color: '#7b7b7b'
            }
          }}
        />
        <Box>
          <Typography fontSize={'14px'} fontWeight={'600'} color={'#444'}>
            {`${conversation.customer.first_name} ${conversation.customer.last_name}`}
          </Typography>
          <Typography fontSize={'12px'} fontWeight={'600'} color={'#444'}>
            Facebook DM
          </Typography>
        </Box>
      </Grid>
      <Grid mt='5px'>
        <Typography
          sx={{
            fontSize: '14px',
            color: '#777',
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {conversation?.last_msg?.content}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ConversationBox;
