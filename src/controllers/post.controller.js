import Post from "../models/Post";

export const addPost = async (req, res, next) => {
  try {
    const author = req.username;
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Missing request information!" });
    }

    const post = new Post({
      title: title,
      author: author,
      content: content,
      date: new Date(),
    });

    post.save();

    return res.status(201).json({ success: true, message: "Post was saved!" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error!" });
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}, { _id: 0 });

    return res.status(200).json({ success: true, posts: posts });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error!" });
  }
};
