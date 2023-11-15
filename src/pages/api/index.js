import dbConnect from '../../../db/connect';
import Post from '../../../db/models/Post';

export default async function handler(req, res) {
  await dbConnect();
  let posts = [];

  if (req.method === 'GET') {
    if (req.query.type === 'Featured') {
      posts = await Post.aggregate([
        { $match: { featured: true } },
        { $sample: { size: 5 } },
      ]);
    }

    if (req.query.type === 'Blog Post') {
      posts = await Post.find({ tags: 'Blog Post' })
        .sort({ createdAt: -1 }) //ascending, newest first
        .limit(5)
        .populate('author');
    }

    if (req.query.type === 'All Blogs') {
      let page = parseInt(req.query.page);
      let skipAmount = (page - 1) * 5;
      console.log(typeof limit);
      posts = await Post.find({ tags: 'Blog Post' })
        .sort({ createdAt: -1 }) //ascending, newest first
        .skip(skipAmount)
        .limit(5)
        .populate('author');
    }

    if (req.query.type === 'Newest Post') {
      posts = await Post.find({ tags: { $ne: 'Blog Post' } })
        .sort({ createdAt: -1 })
        .limit(3);
    }

    if (req.query.type === 'Daytime') {
      let slogan = '';
      let tag = '';
      let hour = new Date().getHours();
      if (hour > 5 && hour < 10) {
        tag = 'breakfast';
        slogan = 'Time For Breakfast';
      } else if (hour < 14) {
        tag = 'lunch';
        slogan = 'Lunch Time!';
      } else if (hour < 20) {
        tag = 'dinner';
        slogan = 'Dinner Recipes';
      } else {
        tag = 'snack';
        slogan = 'Feeling Snackish?';
      }
      const responsePosts = await Post.aggregate([
        { $match: { tags: tag } },
        { $sample: { size: 5 } },
      ]);
      posts = { slogan, posts: responsePosts };
    }

    if (req.query.type === 'Populated') {
      try {
        posts = await Post.find().populate('author');
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
    res.status(200).json(posts);
  }
}
