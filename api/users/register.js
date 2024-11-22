// api/users/register.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '../../utils/dbConnect';
import User from '../../models/UserModel';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const {
    name,
    userRole,
    password,
    profilePic,
    contactInfo,
    rating = 0,
    reviews = 0,
    about,
    currentRole,
    designation,
    department,
    workCity,
    vehicles = [],
  } = req.body;

  await dbConnect();

  try {
    const userExists = await User.findOne({ name });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      userRole,
      password: hashedPassword,
      profilePic,
      contactInfo,
      rating,
      reviews,
      about,
      currentRole,
      designation,
      department,
      workCity,
      vehicles,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
