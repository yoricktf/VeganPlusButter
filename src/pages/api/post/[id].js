import dbConnect from "../../../../db/connect"
import Post from "../../../../db/models/Post"
import User from "../../../../db/models/User"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req, res) {
  await dbConnect()
  const session = await getServerSession(req, res, authOptions)
  const { id } = req.query

  if (req.method === "GET") {
    const post = await Post.findById(id)
    res.status(200).json(post)
  }

  if (req.method === "DELETE") {
    const adminUser = await User.findById(session?.user.id)
    if (adminUser.admin) {
      const post = await Post.findByIdAndDelete(id)
      res.status(200).json('Post has been deleted')
    } else {
      res.status(401).json({ message: "You are not authorized to delete this post" })
    }
  }

  if (req.method === "PATCH") {
    const post = JSON.parse(req.body);
    const adminUser = await User.findById(session?.user.id)
    if (adminUser.admin) {
      const editedPost = await Post.findByIdAndUpdate(id, post)
      res.status(200).json(editedPost)
    } else {
      res.status(401).json({ message: "You are not authorized to edit this post" })
    }
  }
}
