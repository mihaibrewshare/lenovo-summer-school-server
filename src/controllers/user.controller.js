import User from "../models/User";
import { encryptPassword } from "../services/bcrypt.service";
import { sign } from "../services/jwt.service";

export const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing request information!" });
    }

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists!" });
    }

    const encryptedPassword = await encryptPassword(password);

    const user = new User({
      username: username,
      password: encryptedPassword,
    });
    user.save();

    return res.status(201).json({ success: true, message: "User was saved!" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error!" });
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist!" });
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong credentials!" });
    }

    const token = sign(username);

    return res.status(200).json({ success: true, token: token });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error!" });
  }
};
