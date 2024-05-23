export const checkUsernameHeader = (req, res, next) => {
  if (req.headers["username"]) {
    req.username = req.headers["username"];
    next();
  } else {
    res
      .status(401)
      .json({ success: false, message: "Missing username header!" });
  }
};
