import dbConnect from '../../../db/connect';
import User from '../../../db/models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const userObject = JSON.parse(req.body);
    const user = await User.find({ email: userObject.email });
    res.status(200).json(user);
  }

  if (req.method === 'GET') {
    let admins = [];
    const users = await User.find();
    for (let user of users) {
      user.admin === true ? admins.push(user) : null;
    }
    res.status(200).json(admins);
  }
}
