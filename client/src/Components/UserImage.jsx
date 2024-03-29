import { Box } from "@mui/material";

const UserImage = ({ profilePic, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        src={`http://localhost:3000/assets/${profilePic}`}
        style={{
          objectFit: "cover",
          borderRadius: "50%",
        }}
        alt="user"
        width={size}
        height={size}
      />
    </Box>
  );
};
export default UserImage;
