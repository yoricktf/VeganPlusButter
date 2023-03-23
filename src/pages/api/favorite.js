import dbConnect from "../../../db/connect"
import User from "../../../db/models/User"

export default async function handler(req, res) {
  await dbConnect()




  const { userId, postId } = JSON.parse(req.body)
  console.log(userId)

  if (req.method === "POST") {

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
    //   res.status(200).json(user)
    // console.log(req.body)
  }
}
