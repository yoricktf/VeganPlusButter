import mongoose from 'mongoose'
const { Schema } = mongoose;
const postSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: Array, required: true },
  method: { type: Array, required: true },
  featured: Boolean,
  images: Array,
  date: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: Array,
  difficulty: Number,
  cookTime: String,
  prepTime: String,
  servingSize: Number,
  numberOfComments: Number,
  numberOfFavorites: Number,
  typeOfPost: String
}, {
  // this second object adds extra properties: `createdAt` and `updatedAt`
  timestamps: true,
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export default Post;
