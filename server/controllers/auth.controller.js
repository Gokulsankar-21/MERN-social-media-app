import bcrypt from "bcrypt";
import User from "../model/User.model.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  console.log("register request");
  const {
    firstName,
    lastName,
    email,
    password,
    profilePic,
    location,
    occupation,
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
      impressions: Math.floor(Math.random() * 1000),
    });
    const saveduser = await newUser.save();

    res.status(201).json(saveduser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    if (isMatch) {
      delete user.password;
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY);

      return res.status(200).json({ token, user });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
