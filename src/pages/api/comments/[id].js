import dbConnect from "../../../../db/connect"
import Comment from "../../../../db/models/Comment"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req, res) {
  await dbConnect()
  const session = await getServerSession(req, res, authOptions)

  if (req.method === "DELETE") {
    const commentId = req.query.id
    const { author } = await Comment.findById(commentId)

    if (author.valueOf() === session.user.id) {
      try {
        const deletedComment = await Comment.findByIdAndDelete(commentId)
        res.status(200).json(deletedComment)
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
    } else {
      res.status(401).json({ message: "You are not authorized to delete this comment" })
    }

  }
}
