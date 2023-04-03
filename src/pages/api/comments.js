import dbConnect from "../../../db/connect"
import Comment from "../../../db/models/Comment"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "GET") {
    try {
      const allComments = await Comment.find().populate('author')
      res.status(200).json(allComments)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  if (req.method === "POST") {
    try {
      const commentObject = await JSON.parse(req.body)
      const submittedComment = await Comment.create(commentObject)
      res.status(200).json(submittedComment)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
