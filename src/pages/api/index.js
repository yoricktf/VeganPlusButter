import dbConnect from "../../../db/connect"
import Post from "../../../db/models/Post"


export default async function handler(req, res) {
  dbConnect()
  if (req.method === "GET") {
    const posts = await Post.find()
    console.log(posts)
    res.status(200).json(posts)
  }
}
