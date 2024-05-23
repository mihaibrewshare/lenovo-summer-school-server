import { verify } from "../services/jwt.service";

export const checkAuthToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "Missing authorization header!" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Missing bearer token!" });
  }

  const payload = verify(token);
  if (!payload || !payload.username) {
    return res
      .status(401)
      .json({ success: false, message: "Token not valid!" });
  }

  req.username = payload.username;
  next();
};
