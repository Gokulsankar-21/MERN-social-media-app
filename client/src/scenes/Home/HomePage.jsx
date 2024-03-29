import Box from "@mui/material/Box";
import { NavBar } from "../Navbar/NavBar";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import UserWidget from "scenes/Widgets/UserWidget";

export const HomePage = () => {
  const { _id, profilePic } = useSelector((state) => state.users);
  // responsive design
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box p="1rem 6%">
      <NavBar />W
      <Box
        display={isNonMobileScreens ? "flex" : "block"}
        gap="3rem"
        justifyContent="space-between"
      ></Box>
      <UserWidget userId={_id} profilePic={profilePic} />
    </Box>
  );
};

/**
 * profile pic nama local computer la disk la iruku, so itha nama req panni edukurom
 * intha multer use panni disk storage la pannum bothu ipa learningla vera entha platform kum poga theva ila
 */
