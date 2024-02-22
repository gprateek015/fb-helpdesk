'use client';

import { fetchMessages, sendMessage } from '@/actions/conversation';
import { FormInput } from '@/components/auth/styles';
import MessageBox from '@/components/message-box';
import { Message } from '@/redux/slice/conversation';
import { updatePrevPath } from '@/redux/slice/user';
import { useDispatch, useSelector } from '@/redux/store';
import {
  CircularProgress,
  Grid,
  InputAdornment,
  Typography
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

type Chat = {
  messages: string[];
  timestamps: string[];
  msg_by: 'user' | 'customer';
};

const Conversation = () => {
  const {
    selectedConversation,
    customer,
    data: messages
  } = useSelector(state => state.conversation);
  const { data: userData, isLoggedin } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [textMsg, setTextMsg] = useState('');
  const [msgSending, setMsgSending] = useState(false);
  const pathname = usePathname();

  const fetchAllMessages = async (conversation_id: string) => {
    setLoading(true);
    await dispatch(fetchMessages({ conversation_id }));
    setLoading(false);
  };

  const onSendMessage = async () => {
    setMsgSending(true);
    await dispatch(
      sendMessage({ content: textMsg, conversation_id: selectedConversation })
    );
    setTextMsg('');
    setMsgSending(false);
  };

  const chats = useMemo(() => {
    let chats: Chat[] = [];

    messages.forEach(message => {
      if (chats.length === 0) {
        return chats.push({
          messages: [message.content],
          msg_by: message.msg_by,
          timestamps: [message.timestamp]
        });
      }

      const lastChat = chats[chats.length - 1];
      if (lastChat?.msg_by === message.msg_by) {
        chats.pop();
        chats.push({
          messages: [...lastChat.messages, message.content],
          msg_by: message.msg_by,
          timestamps: [...lastChat.timestamps, message.timestamp]
        });
      } else {
        chats.push({
          messages: [message.content],
          msg_by: message.msg_by,
          timestamps: [message.timestamp]
        });
      }
    });

    return chats;
  }, [messages]);

  useEffect(() => {
    if (selectedConversation) fetchAllMessages(selectedConversation);
  }, [selectedConversation]);

  useEffect(() => {
    if (!isLoggedin) {
      dispatch(updatePrevPath(pathname));
      router.replace('/');
    }
  }, [isLoggedin]);

  return (
    <Grid
      sx={{
        flexGrow: 3,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Grid
        sx={{
          border: '1px solid #dedede',
          padding: '15px',
          height: '62px'
        }}
      >
        {loading ? (
          <CircularProgress
            sx={{
              width: '30px !important',
              height: '30px !important'
            }}
          />
        ) : (
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '20px'
            }}
          >
            {`${customer.first_name} ${customer.last_name}`}
          </Typography>
        )}
      </Grid>
      <Grid
        sx={{
          flexGrow: 1,
          background: '#f0f0f0',
          padding: '15px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Grid
          flexGrow={1}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxHeight: 'calc(100vh - 180px)',
            overflow: 'auto'
          }}
        >
          {loading ? (
            <Grid
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CircularProgress />
            </Grid>
          ) : chats.length !== 0 ? (
            chats.map((chat, ind) => (
              <MessageBox
                key={ind}
                messages={chat.messages}
                msg_by={chat.msg_by}
                timestamps={chat.timestamps}
                name={
                  chat.msg_by === 'user'
                    ? userData.name || ''
                    : `${customer.first_name} ${customer.last_name}`
                }
              />
            ))
          ) : (
            <Typography fontWeight={600} textAlign={'center'}>
              No messages yet
            </Typography>
          )}
        </Grid>
        <Grid mb='10px'>
          <FormInput
            placeholder={`Message ${customer.first_name} ${customer.last_name}`}
            autoFocus
            onKeyDownCapture={e => {
              if (e.key === 'Enter') {
                onSendMessage();
              }
            }}
            onChange={e => setTextMsg(e.target.value)}
            value={textMsg}
            disabled={msgSending}
            InputProps={
              msgSending
                ? {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <CircularProgress
                          sx={{
                            width: '30px !important',
                            height: '30px !important'
                          }}
                        />
                      </InputAdornment>
                    )
                  }
                : {}
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Conversation;
