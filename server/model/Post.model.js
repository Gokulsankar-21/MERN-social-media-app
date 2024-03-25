import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,

    },
    userProfilePic: {
      type: String,
      default: "",
    },
    postPicturePath: {
      type: String,
      default: "",
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
    location: String,
    description: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
/**
 * mongoos is true gift for deveolpers
 */

/**
 * Inga populate pandrathuku pathila post la user deatils um store panniduraom
 * In real-time-app la Oranized and Clean ah maintain pannuvom
 */
