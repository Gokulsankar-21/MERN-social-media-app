import User from "../model/User.model.js";

export const getUser = async (req, res) => {
  if (!req.user.id) {
    return res.status(403).json({ error: "Access Denied" });
  }
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    delete user.password; // work agala
    const { password, ...restUserData } = user._doc;
    res.status(200).json(restUserData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all followers for particular user
export const getUserFriends = async (req, res) => {
  if (!req.user.id) {
    return res.status(403).json({ error: "Access Denied" });
  }
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    const friendsListData = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formatedFriends = friendsListData.map(
      ({
        _id,
        firstName,
        lastName,
        email,
        location,
        profilePic,
        occupation,
      }) => {
        return {
          _id,
          firstName,
          lastName,
          email,
          location,
          profilePic,
          occupation,
        };
      }
    );
    res.status(200).json(formatedFriends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// add or remove follower - nodejs bootcamp - like retweet
export const addRemoveFriend = async (req, res) => {
  if (!req.user.id) {
    return res.status(403).json({ error: "Access Denied" });
  }
  try {
    const userId = req.params.userId;
    const friendId = req.params.friendId;
    const userData = await User.findById(userId);
    const friendData = await User.findById(friendId);
    if (!userData || !friendData) {
      return res.status(404).json({ error: "User Not Found" });
    }
    // 10yrs logic
    if (userData.friends.includes(friendId)) {
      // already friend - remove
      userData.friends.filter((user) => user._id !== friendId); // user data la pammiyachi
      friendData.friends.filter((friend) => friend._id !== friendId); // inga intha social app la - simple functionality
    } else {
      // new friend - add => ithukunu mongoDB exclusive ah methods iruku
      userData.friends.push(friendId); // inga userData oda friend ah return panna pothu
      friendData.friends.push(userId);
    }
    await userData.save();
    await friendData.save();
    // save pananthuku aprm again DB la irunthu antha data va edukuraom
    const friendsListData = await Promise.all(
      userData.friends.map((id) => User.findById(id))
    );
    const formatedFriends = friendsListData.map(
      ({
        _id,
        firstName,
        lastName,
        email,
        location,
        profilePic,
        occupation,
      }) => {
        return {
          _id,
          firstName,
          lastName,
          email,
          location,
          profilePic,
          occupation,
        };
      }
    );
    return res.status(200).json(formatedFriends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 *
 * @inRealTime
 * follower req  - user reqPending [] user data la store agum -  atha nama user ku UI la kamipom -  so athuku thanmiya database la manage panni route ayum manage pannanum
 * so, itha oru user another user ku follow req kudukuranga -
 *      Reality - follow - subscribe -  yaruvenalum kudukalan
 *      Connection - na soldra logic - LinkedIn la pakren
 *
 * I want to do the twitter / linked cloning
 */
