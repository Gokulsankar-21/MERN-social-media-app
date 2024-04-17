import Box from "@mui/material/Box";
import { NavBar } from "../Navbar/NavBar";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import UserWidget from "scenes/Widgets/UserWidget";
import { MyPostWidget } from "scenes/Widgets/MyPostWidget";

export const HomePage = () => {
  const { _id, profilePic } = useSelector((state) => state.user);
  // responsive design
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box p="1rem 6%">
      <NavBar />
      <Box
        display={isNonMobileScreens ? "flex" : "block"}
        gap="3rem"
        justifyContent="space-between"
      >
        <UserWidget
          flexBasis={isNonMobileScreens ? "26%" : undefined}
          userId={_id}
          profilePic={profilePic}
        />
        <Box flexBasis={isNonMobileScreens ? "42%" : undefined}>
          <MyPostWidget profilePic={profilePic} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}></Box>
        )}
      </Box>
    </Box>
  );
};

/**
 * profile pic nama local computer la disk la iruku, so itha nama req panni edukurom
 * intha multer use panni disk storage la pannum bothu ipa learningla vera entha platform kum poga theva ila
 */
/**
 * @Testing and @Futute_ideas
 * nested comments logic handle  pannanaum
 */
