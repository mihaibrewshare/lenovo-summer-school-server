export const checkUsernameHeader = (req, res, next) => {
  if (req.headers["username"]) {
    next();
  } else {
    res.status(400).json({ message: "Missing username header!" });
  }
};
