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
        .limit(5);
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
      console.log('===================HOUR HOUR HOUR::::', hour);
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
        console.log('blog only************', posts);
        res.status(200).json(posts);
      } catch (error) {
        console.log('ERROR MESSAGES=========', error);
        res.status(500).json({ error: error.message });
      }
    }

    res.status(200).json(posts);
  }
}

// fetch 5 random time of day recipes

// fetch blog posts only
