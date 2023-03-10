import mongoose from 'mongoose'
const { Schema } = mongoose;
const commentSchema = new Schema({
  date: String,
  comment: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
export default Comment;
