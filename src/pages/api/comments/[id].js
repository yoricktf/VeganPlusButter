import dbConnect from "../../../../db/connect"
import Comment from "../../../../db/models/Comment"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "DELETE") {
    const commentId = req.query.id
    try {
      const deletedComment = await Comment.findByIdAndDelete(commentId)
      res.status(200).json(deletedComment)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
