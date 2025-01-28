import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please provide all user details" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide all details" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (isPasswordValid) {
        const token = generateToken(existingUser._id);

        res.status(200).json({ token });
      } else {
        return res.status(400).json({ message: "Invalid user password , please try again" });
      }
    } else {
      return res.status(400).json({ message: "User not found , please register yourself first" });
    }

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

export {
  createUser,
  loginUser,
  getAllUsers
};