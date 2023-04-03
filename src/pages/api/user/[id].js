import dbConnect from "../../../../db/connect"
import User from "../../../../db/models/User"

export default async function handler(req, res) {
  await dbConnect()
  const { id } = req.query

  if (req.method === "GET") {
    const user = await User.findById(id).populate('favorites')
    res.status(200).json(user)
  }

  if (req.method === 'PUT') {
    const userObject = JSON.parse(req.body)
    await User.findByIdAndUpdate(id, userObject)
    res.status(200).json('user updated')
  }
}
