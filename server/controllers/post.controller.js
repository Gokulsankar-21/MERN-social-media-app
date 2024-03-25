import User from "../model/User.model.js";
import Post from "../model/Post.model.js";

//create new post 
export const createPost = async (req, res) => {
  if (!req.user.id) {
    return res.status(403).json({ error: "Access Denied" });
  }
  try {
    const { userId, postPicturePath, description } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      userProfilePic: user.profilePic,
      postPicturePath,
      description,
      likes: {},
      comment: [],
    });
    await newPost.save();

    // after creating a new post - we are sending the all post from database
    // inga than na API pathhi innum indepth ah purinjikite
    // API ah epdi use pannanum - frontend la irunthu varathu ena nu teriyanum
    // athae maari backend API irunthu ena send pandrom nu pakkava terinji irukanum when developing
    // ithu industry la evlo importance irukunu understand pannikiten
    // Enterprice level la API la romba Clean ah maintain pannuvanga

    const posts = await Post.find();
    res.status(201).json(posts); // ithoda benefit post pannathuku aprm UI update ahum
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// get all posts
export const getFeedPosts = async (req, res) => {
  if (!req.user.id) {
    return res.status(403).json({ error: "Access Denied" });
  }
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// get relevent user's posts
export const getUserPosts = async (req, res) => {
  if (!req.user.id) {
    return res.status(403).json({ error: "Access Denied" });
  }
  try {
    const { userId } = req.params;
    const posts = await Post.findById({ userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update the posts
export const likePost = async (req, res) => {
  if (!req.user.id) {
    return res.status(403).json({ error: "Access Denied" });
  }
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ error: "Post Not Found" });
    }
    const isLiked = post.likes.get(userId); // keys la map agum
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);//mistake
    }
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          likes: post.likes,
        },
      },
      { new: true }
    );
    return res.status(200).json(updatedPost);
    // specific ah method use panni update pandrom
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
/**
 *
 * @MAP - athu oru Object -  purpose of usage is different
 * key - must be string
 * athu proefficient for mapping purpose -  map pandrathuku use pannuvom
 *  inga Key vechi map pannuvom
 * athu get,set,delete... methods lam iruku
 * ithu on the time la pathen pakkava useful ah irunthichi
 * and tutor joes oda map concept ah pakkanum
 *
 * @Auth
 * Enterprice la auth ku third-party auth ah use pannuvanga
 * athula inum security and alg strong ah irukum
 */
