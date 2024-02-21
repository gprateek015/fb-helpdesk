import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user';
import bcrypt from 'bcrypt';
import catchAsync from '@/lib/catch-async';
import dbConnect from '@/lib/mongo-connect';
import jwt from 'jsonwebtoken';

const loginUser = async (req: NextRequest) => {
  await dbConnect();

  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const json_secret_key = process.env.JWT_SECRET_KEY as string;
      const token = jwt.sign(user._id.toString(), json_secret_key);

      return NextResponse.json(
        { user: { ...user.toJSON(), password: undefined }, token },
        { status: 200 }
      );
    }
  }
  throw new Error("Email and Password doesn't match");
};

export const POST = catchAsync(loginUser);
