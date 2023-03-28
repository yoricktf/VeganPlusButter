import dbConnect from "../../../db/connect";
import Post from "../../../db/models/Post";
import User from "../../../db/models/User";


export default async function handler(req, res) {
  await dbConnect()

  if (req.method === 'POST') {
    const postObject = await JSON.parse(req.body)
    const response = await Post.create(postObject)
    res.status(200).json(response)
  }
}
