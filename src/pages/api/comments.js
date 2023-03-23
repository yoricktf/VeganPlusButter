import dbConnect from "../../../db/connect"
import Comment from "../../../db/models/Comment"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "GET") {
    const allComments = await Comment.find().populate('author')
    res.status(200).json(allComments)
  }

  if (req.method === "POST") {
    const commentObject = await JSON.parse(req.body)
    const submittedComment = await Comment.create(commentObject)
    res.status(200).json(submittedComment)
  }
}
