import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    friends: {
      // namala follow pandravanhga
      type: Array,
    },
    // following: { // - ithu linkedIn ku suitable ah iruku
    //   // nama innoruthara follow pandathu
    //   type: Array,
    // },
    profilePic: {
      type: String,
      default: "",
      min: 5,
      max: 50,
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
/**
 * mongoos is true gift for deveolpers
 */
