import catchAsync from '@/lib/catch-async';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/mongo-connect';
import jwt from 'jsonwebtoken';
import getUser from '@/lib/get-user';

const registerUser = async (req: NextRequest) => {
  await dbConnect();

  const { email, name, password } = await req.json();

  const saltRounds = 10;
  const user = new User({
    email,
    name,
    password: await bcrypt.hash(password, saltRounds)
  });

  await user.save();

  const json_secret_key = process.env.JWT_SECRET_KEY as string;
  const token = jwt.sign(user._id.toString(), json_secret_key);

  return NextResponse.json(
    { user: { ...user.toJSON(), password: undefined }, token },
    { status: 200 }
  );
};

const fetchSelf = async (req: NextRequest) => {
  await dbConnect();

  const user = await getUser(req);

  return NextResponse.json({ user }, { status: 200 });
};

export const POST = catchAsync(registerUser);
export const GET = catchAsync(fetchSelf);
