import dbConnect from "../../../db/connect";
import Post from "../../../db/models/Post";
import User from "../../../db/models/User";


export default async function handler(req, res) {
  await dbConnect()

  if (req.method === 'POST') {
    const postObject = await JSON.parse(req.body)

    const user = await User.find({ email: postObject.author })

    const PostObjectWithAuthorId = { ...postObject, author: user[0]._id }

    //the recipe data and adding the specfic users id
    const response = await Post.create(PostObjectWithAuthorId)
    res.status(200).json(response)
  }




}
