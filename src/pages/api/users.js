import dbConnect from "../../../db/connect"
import User from "../../../db/models/User"

export default async function handler(req, res) {
  await dbConnect()

  const userObject = JSON.parse(req.body)

  if (req.method === "POST") {
    const user = await User.find({ email: userObject.email })
    res.status(200).json(user)
  }
}
