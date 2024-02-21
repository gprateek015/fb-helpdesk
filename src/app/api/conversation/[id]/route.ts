import { NextRequest, NextResponse } from 'next/server';
import Message from '@/models/message';
import catchAsync from '@/lib/catch-async';
import Conversation from '@/models/conversation';
import dbConnect from '@/lib/mongo-connect';

const getMessagesOfConversation = async (
  req: NextRequest,
  route: { params: { id: string } }
) => {
  await dbConnect();

  const convoId = route.params.id;

  const messages = await Message.find({ conversation: convoId });
  const { customer } = await Conversation.findById(convoId).populate(
    'customer'
  );

  return NextResponse.json({ messages, customer });
};

export const GET = catchAsync(getMessagesOfConversation);
