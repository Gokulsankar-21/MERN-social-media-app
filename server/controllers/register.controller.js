import bcrypt from "bcrypt";
import User from "../model/User.model";
export const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    profilePic,
    location,
    occupation,
    viewedProfile,
    impressions,
  } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profilePic,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions:Math.floor(Math.random() * 1000),
    });
    const saveduser = await newUser.save();
    res.status(201).json(saveduser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
