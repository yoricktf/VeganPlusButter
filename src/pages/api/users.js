import dbConnect from "../../../db/connect"
import User from "../../../db/models/User"

export default async function handler(req, res) {
  await dbConnect()

  const userObject = JSON.parse(req.body)

  if (req.method === "POST") {
    const user = await User.find({ email: userObject.email })
    if (user.length === 0) {
      const newUser = await User.create(userObject)
      res.status(200).json(newUser)
    } else {
      res.status(200).json('existing user')
    }
    // res.status(200).json()
  }
}
