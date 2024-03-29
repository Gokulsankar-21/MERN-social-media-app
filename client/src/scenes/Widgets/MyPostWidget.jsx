import {
  MicOutlined,
  AttachFileOutlined,
  DeleteOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FlexBetween } from "Components/FlexBetween";
import UserImage from "Components/UserImage";
import WidgetWrapper from "Components/WidgetWrapper";
import { setPosts } from "State/Redux";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";

export const MyPostWidget = ({ profilePic }) => {
  // state
  const [isImageBoxClick, setIsImageBoxClick] = useState(false);
  const [post, setPost] = useState(""); //descrption only
  const [postImage, setPostImage] = useState(null);
  const [showError, setShowError] = useState(false);

  // global state
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // theme
  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  // responsive design
  const isNonMobileScreens = Boolean(useMediaQuery("(min-width:1000px)"));
  // handle post submit
  const handleSubmit = async () => {
    // if (!post) {
    //   setShowError("please add a post description");
    //   return; // user can post image alone

    if (!post || !postImage) {
      setShowError("please add a post...");
    }
    // multi-part form data va mathanum
    const formData = new FormData();
    formData.append("userId", user._id); //mongoDB
    formData.append("description", post); //mongoDB
    if (postImage) {
      formData.append("picture", postImage); //multer- inga user profile and user post ku thaniya file ah multer moolima manage panalam
      formData.append("postPicturePath", postImage.name); //mongoDB
    }
    const res = await fetch(`http:localhost:3000/api/posts/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (res.ok) {
      const allPosts = await res.json(); // after creating a new post our API send all posts from mongoDB
      dispatch(
        setPosts({
          posts: allPosts,
        })
        //inga global state la post ah store panni antha data va vechi post component create pandrom
      );
      setPost("");
      setPostImage(null);
    }
  };
  return (
    <WidgetWrapper>
      {/* My POST - HEADER */}
      <FlexBetween gap="1.5rem">
        {/*intha profile pic la teliva irukanum, ithu nama local computer ku req kudukanum so athuku athoda path teriaynum */}
        <UserImage profilePic={profilePic} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            p: "1rem 2rem",
            backgroundColor: palette.neutral.light, //dark gray
            borderRadius: "2rem",
          }}
        />
      </FlexBetween>
      {/* My POST - Image/file container  - BODY*/}
      {isImageBoxClick && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setPostImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  //inga rootprops ellathayum ithuku kudukuromn
                  //so basic ah props anga potu process panni
                  //namaku methods and props root la varum
                  //athoda child input element ku intha onDrop event pogum
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <input {...getInputProps()} />
                  {/** ithhu width fit-content la iruku so itha click pannathan file opern agum and onDrop function ithuula irukum  */}
                  {!postImage ? (
                    <p>Add Post Image Here...</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{postImage.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {/* image iuntha delete icon irukanum */}
                {postImage && (
                  <IconButton
                    sx={{ width: "15%" }}
                    onClick={() => setPostImage(null)}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />

      {/* Icon Buttons */}
      <FlexBetween>
        {/* image button */}
        <FlexBetween
          gap="0.25rem"
          onClick={() => setIsImageBoxClick(!isImageBoxClick)} //itha switch on/off maari pannitom
        >
          <ImageOutlined
            sx={{
              color: mediumMain,
            }}
          />
          <Typography
            color={mediumMain}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: medium,
              },
            }}
          >
            Image
          </Typography>
        </FlexBetween>
        {/* ithu big screen mattum remainning icon show pandrom */}
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem" onClick={() => {}}>
              <GifBoxOutlined
                sx={{
                  color: mediumMain,
                }}
              />
              <Typography
                color={mediumMain}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    color: medium,
                  },
                }}
              >
                Clip
              </Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem" onClick={() => {}}>
              <AttachFileOutlined
                sx={{
                  color: mediumMain,
                }}
              />
              <Typography
                color={mediumMain}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    color: medium,
                  },
                }}
              >
                Attachements
              </Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem" onClick={() => {}}>
              <MicOutlined
                sx={{
                  color: mediumMain,
                }}
              />
              <Typography
                color={mediumMain}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    color: medium,
                  },
                }}
              >
                Audio
              </Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem" onClick={() => {}}>
            <MoreHorizOutlined
              sx={{
                color: mediumMain,
              }}
            />
          </FlexBetween>
        )}
        {/* POST BUTTON */}
        <Button
          disabled={!post}
          onClick={handleSubmit}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            "&:hover": {
              color: "#000",
            },
          }}
        >
          Post
        </Button>
      </FlexBetween>
      {showError && (
        <Box color="red" mt="0.5rem">
          {showError}
        </Box>
      )}
    </WidgetWrapper>
  );
}; // intha mypost logged user odathu so avroda data than athula irukanum

/**
 * Blog post and Social media post vera
 *
 * @Improvement
 * intha project ku loading complete ah ella edathulayum  ready pannanum
 * inga social medai post ala na clip , attachment and audio ah add pannanum
 * user Model la user oda social links ah attach pananaum so athuku undana frontend and backend functionality
 */
/**
 *    * Epdi Components ah reusable ah perfect ah use pannanum nu innum kathukiten
 *    * intha projects la mypost la clip,attachement,audio ithu ellam multer moolima seperate handle panalam -  so, ithu mongoDb la filepath store pannanum - ithuketha process pannanum
 *    * intha project oda workflow backend ah complete ah mudichitu frontend konja konja ma build pandorm api get req and post req then finally update,delete api req pandrom
 *      ithu one of the way and menn blog la pathathu one of the way athu enaky favorite and best way
 *    * ipa material ui ah handle panna kathukiten
 *
 */
