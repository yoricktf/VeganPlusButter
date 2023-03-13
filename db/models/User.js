import mongoose from 'mongoose'
const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: { type: String, required: true },
  email: { type: String, required: true },
  profilePicture: String,
  admin: Boolean,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
