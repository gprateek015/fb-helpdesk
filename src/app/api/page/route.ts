import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import Page from '@/models/page';
import catchAsync from '@/lib/catch-async';
import getUser from '@/lib/get-user';
import User from '@/models/user';
import dbConnect from '@/lib/mongo-connect';

const getPageDetails = async ({
  user_id,
  access_token
}: {
  user_id: string;
  access_token: string;
}) => {
  const resp = await axios.get(
    `https://graph.facebook.com/${user_id}/accounts?access_token=${access_token}`
  );
  const {
    access_token: page_access_token,
    name,
    id: page_id
  } = resp.data.data[0];
  return {
    page_access_token,
    name,
    page_id
  };
};

const subscribeToPageMessages = async ({
  page_id,
  access_token
}: {
  page_id: string;
  access_token: string;
}) => {
  await axios.post(
    `https://graph.facebook.com/${page_id}/subscribed_apps?subscribed_fields=messages&access_token=${access_token}`
  );
};

const createPage = async (req: NextRequest) => {
  await dbConnect();
  const { user_id, access_token } = await req.json();
  const user = await getUser(req);

  if (!user) {
    throw new Error('Authentication Error');
  }
  const { page_access_token, name, page_id } = await getPageDetails({
    user_id,
    access_token
  });

  await subscribeToPageMessages({ page_id, access_token: page_access_token });
  let page = await Page.findOne({ page_id });

  if (!page) {
    page = new Page({
      access_token: page_access_token,
      page_id,
      name,
      admin_user: user
    });
  }

  await page.save();
  await User.findByIdAndUpdate(user._id, { page });

  return NextResponse.json({ success: true, page }, { status: 200 });
};

const deletePage = async (req: NextRequest) => {
  await dbConnect();
  const user = await getUser(req);
  if (!user) {
    throw new Error('Authentication Error');
  }

  await User.findByIdAndUpdate(user._id, { page: null });
  return NextResponse.json({ success: true });
};

export const POST = catchAsync(createPage);
export const DELETE = catchAsync(deletePage);
