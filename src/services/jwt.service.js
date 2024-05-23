import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "123456";
const tokenExpirationInSeconds = 36000;

export const sign = (username) => {
  return jwt.sign({ username: username }, jwtSecret, {
    expiresIn: tokenExpirationInSeconds,
  });
};

export const verify = (token) => {
  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
  } catch (err) {
    return null;
  }
};
