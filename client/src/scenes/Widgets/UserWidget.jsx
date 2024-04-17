import { useTheme } from "@emotion/react";
import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider } from "@mui/material";
import { FlexBetween } from "Components/FlexBetween";
import { UserImage } from "Components/UserImage";
import { WidgetWrapper } from "Components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, profilePic }) => {
  const [user, setUser] = useState(null);
  // react hooks
  const navigate = useNavigate();
  // get token from redux
  const token = useSelector((state) => state.token);
  // fetching user info
  const fetchUser = async () => {
    const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return; // res ilana return panniduven, so user null ah iruku - ithu incorrect user or other error
    }
    if (res.ok) {
      setUser(data); // res ok na than set panvom
    }
  };

  // ithu UserWidget First time render agum bothu call pannanum
  useEffect(() => {
    fetchUser();
  }, []);

  // getting theme colors from theme provider
  const { palette } = useTheme();
  const dark = palette.neutral.dark; // high - gray color
  const medium = palette.neutral.medium; // medium(low) gray color
  const main = palette.neutral.main; // main -gray color
  // Extra Protection
  if (!user) {
    return;
  }
  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;
  return (
    <WidgetWrapper>
      {/* 1ST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          {/* user profile pic */}
          <UserImage profilePic={profilePic} />
          {/* user name and freinds */}
          <Box>
            <Typography
              variant="h4"
              fontWeight="500"
              color={dark}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light, // ithu light blue color
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.lenght} friends</Typography>
          </Box>
        </FlexBetween>
        {/* follow icon */}
        <ManageAccountsOutlined />s
      </FlexBetween>

      {/* ----Divider--- */}
      <Divider />

      {/* 2ND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" mb="0.5rem" gap="1rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" mb="0.5rem" gap="1rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      {/* ----Divider--- */}
      <Divider />

      {/* 3RD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography fontWeight="500" color={main}>
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your posts</Typography>
          <Typography fontWeight="500" color={main}>
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      {/* ----Divider--- */}
      <Divider />

      {/* 4TH ROW */}
      <Box p="1rem 0">
        <Typography fontWeight="500" fontSize="1rem" color={main} mb="1rem">
          Social Profiles
        </Typography>
        {/* twitter */}
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography fontWeight="500" color={main}>
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        {/* linkedin */}
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography fontWeight="500" color={main}>
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
/**
 *
 * indha widgets um reusable componentsthan
 * Home page la logged user data show pannuvom so state la irunthu user id ah eduthu ithuku props ah pass panni
 * athukula user data fetch pannuvom
 * itha profile page kum itha widget ah set pannuvom aanga nama profile page la params moolima id get panni ithuku props ah send pannivom
 * so ithu maari inga try pandrom
 *
 *
 * ithae than ellam widgets kum
 * main widgets la all posts
 * profile la athae main wideget la antha user oda post mattum varum
 * so ithu segment ah itha na set pandorm
 * ithuketha api call pannanum
 *
 * ovvoru widget la req pannum bothu header la Authorization set panni validate pandrom
 * inga every API call ku Authentication nadakum
 */
