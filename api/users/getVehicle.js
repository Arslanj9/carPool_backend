// api/users/getVehicle.js
import dbConnect from '../../utils/dbConnect';
import User from '../../models/UserModel';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { vehicleId } = req.body;

  if (!vehicleId) {
    return res.status(400).json({ message: 'Vehicle ID is required' });
  }

  await dbConnect();

  try {
    const user = await User.findOne({ 'vehicles._id': vehicleId }, { 'vehicles.$': 1 });
    if (!user || user.vehicles.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json(user.vehicles[0]);
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}
