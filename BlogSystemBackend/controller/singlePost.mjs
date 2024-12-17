import Post from '../models/Post.mjs'
export const getPost= async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id)
    res.json(postDoc);
  }

  export const deletePost = (req, res) => {
    const { id } = req.params; 
  
    Post.deleteOne({ _id: id }) 
      .then(() => {
        res.status(200).json({ message: "Post deleted successfully" });
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  };
  