import dbConnect from "../../../../db/connect"
import Post from "../../../../db/models/Post"

export default async function handler(req, res) {
  await dbConnect()
  const { id } = req.query

  if (req.method === "GET") {
    const post = await Post.findById(id)
    res.status(200).json(post)
  }

  if (req.method === "POST") {
    const post = await Post.findByIdAndDelete(id)
    res.status(200).json('Post has been deleted')
  }

  if (req.method === "PATCH") {
    const post = JSON.parse(req.body);
    console.log(post)

    const editedPost = await Post.findByIdAndUpdate(id, post)
    res.status(200).json(editedPost)
  }
}
