import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
console.log('-----------------------MONGODB', MONGODB_URI)
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
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
      bufferCommands: true,
    };

    // cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
    //   return mongoose;
    // });

    cached.promise = await mongoose.connect(MONGODB_URI, opts)
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
