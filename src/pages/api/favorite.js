import dbConnect from "../../../db/connect"
import User from "../../../db/models/User"

export default async function handler(req, res) {
  await dbConnect()


  if (req.method === "POST") {
    const user = await User.findById(req.body)
    res.status(200).json(user.favorites)
  }


  if (req.method === "PATCH") {
    const { userId, postId } = JSON.parse(req.body)
    console.log('=========PostID', postId)
    const user = await User.findByIdAndUpdate(userId,
      [
        {
          $set: {
            favorites: {
              $cond: [{ $in: [postId, "$favorites"] },
              { $setDifference: ["$favorites", [postId]] },
              { $concatArrays: ["$favorites", [postId]] }]
            }
          }
        }
      ]
    )
    console.log('+++++++++++USER FAVORITES', user.favorites)
    res.status(200).json(user.favorites)
  }
}
