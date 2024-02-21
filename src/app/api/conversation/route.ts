import catchAsync from '@/lib/catch-async';
import getUser from '@/lib/get-user';
import dbConnect from '@/lib/mongo-connect';
import Conversation from '@/models/conversation';
import { NextRequest, NextResponse } from 'next/server';

const getAllConversation = async (req: NextRequest) => {
  await dbConnect();
  const user = await getUser(req);

  const { page_id } = user.page;

  const convos = await Conversation.find({ page: page_id })
    .sort({ modified_at: -1 })
    .populate(['customer', 'last_msg']);

  return NextResponse.json({ conversations: convos }, { status: 200 });
};

export const GET = catchAsync(getAllConversation);
