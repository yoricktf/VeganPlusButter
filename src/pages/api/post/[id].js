import dbConnect from "../../../../db/connect"
import Post from "../../../../db/models/Post"

export default async function handler(req, res) {
  await dbConnect()
  const { id } = req.query

  if (req.method === "GET") {
    const post = await Post.findById(id)
    res.status(200).json(post)
  }
}
