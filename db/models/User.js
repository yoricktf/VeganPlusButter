import mongoose from 'mongoose';
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    bio: { type: String, default: '' },
    email: { type: String, required: true, unique: true },
    image: String,
    admin: { type: Boolean, default: false },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
