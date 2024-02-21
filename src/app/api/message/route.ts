import { NextRequest, NextResponse } from 'next/server';
import Message from '@/models/message';
import Conversation from '@/models/conversation';
import dbConnect from '@/lib/mongo-connect';
import catchAsync from '@/lib/catch-async';
import axios from 'axios';

const sendMessageToMessenger = async ({
  psid,
  access_token,
  page_id,
  content
}: {
  psid: string;
  access_token: string;
  page_id: string;
  content: string;
}) => {
  await axios.post(
    `https://graph.facebook.com/v19.0/${page_id}/messages?access_token=${access_token}`,
    {
      recipient: {
        id: psid
      },
      messaging_type: 'RESPONSE',
      message: {
        text: content
      }
    }
  );
};

const sendMessage = async (req: NextRequest) => {
  await dbConnect();

  const { content, conversation_id } = await req.json();
  const convo = await Conversation.findById(conversation_id).populate([
    'page',
    'customer'
  ]);

  if (!convo) {
    throw new Error('Conversation not found!');
  }

  await sendMessageToMessenger({
    psid: convo.customer.psid,
    access_token: convo.page.access_token,
    page_id: convo.page.page_id,
    content
  });

  const msg = await Message.create({
    conversation: convo,
    timestamp: Date.now(),
    content,
    msg_by: 'user'
  });

  convo.last_msg = msg;
  await convo.save();

  return NextResponse.json({ success: true }, { status: 200 });
};

export const POST = catchAsync(sendMessage);
