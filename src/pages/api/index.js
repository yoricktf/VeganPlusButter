import dbConnect from '../../../db/connect';
import Post from '../../../db/models/Post';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'GET') {
    try {
      const posts = await Post.find().populate('author');
      res.status(200).json(posts);
    } catch (error) {
      console.log('ERROR MESSAGES=========', error);
      res.status(500).json({ error: error.message });
    }
  }
}
