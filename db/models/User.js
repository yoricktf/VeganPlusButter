import mongoose from 'mongoose'
const { Schema } = mongoose;
const userSchema = new Schema({
  name: { type: String, required: true },
  bio: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  image: String,
  admin: { type: Boolean, default: false },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
