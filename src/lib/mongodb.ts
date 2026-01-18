import mongoose, { Mongoose } from "mongoose";

// 1. Assert the type as string because we check for its existence immediately below
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in .env.local");
}

interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend global type
declare global {
  // eslint-disable-next-line no-var
  var mongoose: Cached | undefined;
}

// 2. Initialize the cache properly
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB(): Promise<Mongoose> {
  // 3. At this point, 'cached' is guaranteed to exist due to the check above, 
  // but we use '!' to tell TS we are sure.
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    };

    // MONGODB_URI is now recognized as a string
    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}