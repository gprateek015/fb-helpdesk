import catchAsync from '@/lib/catch-async';
import getUser from '@/lib/get-user';
import Page from '@/models/page';
import dbConnect from '@/lib/mongo-connect';
import Conversation from '@/models/conversation';
import { NextRequest, NextResponse } from 'next/server';

const getAllConversation = async (req: NextRequest) => {
  await dbConnect();
  const user = await getUser(req);

  const { _id: page_db_id } = user.page;

  const page = await Page.findById(page_db_id);

  const convos = await Conversation.find({ page: page })
    .sort({ modified_at: -1 })
    .populate(['customer', 'last_msg']);

  return NextResponse.json({ conversations: convos }, { status: 200 });
};

export const GET = catchAsync(getAllConversation);
