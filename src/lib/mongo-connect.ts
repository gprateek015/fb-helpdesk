import mongoose from 'mongoose';
import _page from '@/models/page';
import _user from '@/models/user';
import _conversation from '@/models/conversation';
import _message from '@/models/message';
import _customer from '@/models/customer';

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env*.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      import('@/models/page');
      import('@/models/user');
      import('@/models/conversation');
      import('@/models/message');
      import('@/models/customer');
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
