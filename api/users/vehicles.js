// api/users/vehicles.js
import dbConnect from '../../utils/dbConnect';
import User from '../../models/UserModel';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  await dbConnect();

  try {
    const user = await User.findById(userId).select('vehicles');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.vehicles);
  } catch (error) {
    console.error('Error fetching user vehicles:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}
