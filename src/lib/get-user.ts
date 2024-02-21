import jwt from 'jsonwebtoken';
import User from '@/models/user';
import { NextRequest } from 'next/server';

const getUser = async (req: NextRequest) => {
  const authorization = req.headers.get('authorization');
  try {
    if (!authorization) {
      throw new Error();
    }

    const json_secret_key = process.env.JWT_SECRET_KEY as string;
    const user_id = jwt.verify(authorization, json_secret_key) as string;

    const user = await User.findById(user_id).populate('page');
    return { ...user.toJSON(), password: undefined };
  } catch (err) {
    throw new Error('Authorization Error');
  }
};

export default getUser;
