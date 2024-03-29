'use client';

import ConversationBox from '@/components/conversation-box/page';
import {
  Box,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import RefreshIcon from '@mui/icons-material/RefreshSharp';
import SegmentIcon from '@mui/icons-material/Segment';
import { useDispatch, useSelector } from '@/redux/store';
import { Conversation, selectConversation } from '@/redux/slice/conversation';
import { fetchAllConversations, fetchMessages } from '@/actions/conversation';
import '@/app/conversations/@allconvo/page.css';

const Conversations = () => {
  const { allConversations, selectedConversation } = useSelector(
    state => state.conversation
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const fetchConversations = async () => {
    setLoading(true);
    await dispatch(fetchAllConversations());

    if (selectedConversation) {
      await dispatch(fetchMessages({ conversation_id: selectedConversation }));
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!selectedConversation && !isMobile) {
      dispatch(selectConversation(allConversations?.[0]?._id));
    } else if (isMobile) {
      dispatch(selectConversation(''));
    }
  }, [allConversations, isMobile]);

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <Grid width={{ xs: 'calc(100vw - 60px)', md: '300px' }}>
      <Grid
        sx={{
          border: '1px solid #dedede',
          padding: '5px 5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 62
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <IconButton>
            <SegmentIcon sx={{ color: '#9c9c9c' }} />
          </IconButton>
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '20px'
            }}
          >
            Conversations
          </Typography>
        </Box>
        <IconButton sx={{}} onClick={() => fetchConversations()}>
          <RefreshIcon
            sx={{ color: '#7c7c7c' }}
            className={loading ? 'conversations-loading' : ''}
          />
        </IconButton>
      </Grid>
      <Grid flexGrow={1}>
        {allConversations.map((conversation: Conversation) => (
          <ConversationBox
            key={conversation._id}
            conversation={conversation}
            active={selectedConversation === conversation._id}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Conversations;
