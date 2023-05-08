import dbConnect from "../../../../db/connect"
import User from "../../../../db/models/User"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "GET") {
    try {
      const { id } = req.query
      const user = await User.findById(id).populate('favorites')
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id } = req.query
      const userObject = JSON.parse(req.body)
      await User.findByIdAndUpdate(id, userObject)
      res.status(200).json('user updated')
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
