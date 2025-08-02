import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const imageUrl = req.file ? req.file.path : "";

    const userExists = await User.findOne({
      email,
    });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
    });

    await newUser.save();
    res.status(201).json({ message: "user register successfully" });
  } catch (error) {
    res.status(500).json({ message: "already Exists" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const userToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      }
    );

    res
      .cookie("userToken", userToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 3600000,
      })
      .send({
        message: "User logged in successfully",
        user: {
          id: user._id,
          email: user.email,
        },
      });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res
      .clearCookie(`userToken`, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error.message);
    res.status(500).json({ message: "Logout failed" });
  }
};
