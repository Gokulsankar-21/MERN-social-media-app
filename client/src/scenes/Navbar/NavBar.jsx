import Box from "@mui/material/Box";
import {
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { FlexBetween } from "Components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { setLogIn, setLogOut, setMode } from "State/Redux";
import { useNavigate } from "react-router-dom";
import {
  Close,
  DarkMode,
  Help,
  LightMode,
  Menu,
  Message,
  Notifications,
  Search,
} from "@mui/icons-material";
export const NavBar = () => {
  // Global State - State managements
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const fullName = "gokul"; // `${user.firstName} ${user.lastName}` ||
  // action creator

  // ----get the theme from provider----
  const theme = useTheme(); // theme obj
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // React hooks
  const navigate = useNavigate();
  // local State
  const isBigScreens = useMediaQuery("(min-width:1000px)"); // input
  // setIsBigScreens(useMediaQuery("(min-width:1000px)"));
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      {/* LOGO - Commen all devices */}
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem,2rem,2.25rem)"
          color="primary"
          onClick={() => {
            navigate("/home");
          }}
          sx={{
            "&:hover": {
              color: dark,
              cursor: "pointer",
            },
          }}
        >
          SocioPedia
        </Typography>
        {/* INPUT-SEARCH : only Big Screens */}
        {isBigScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isBigScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {/* Theme based Icon */}
            {theme.palette.mode === "dark" ? <DarkMode /> : <LightMode />}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogOut())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => {
            setIsMobileMenuToggled(!isMobileMenuToggled);
          }}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isBigScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          top="0"
          minWidth="300px"
          maxWidth="500px"
          heigth="100%"
          zIndex="10"
          backgroundColor={background}
        >
          {/* CLOSE ICON  */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: "1rem",
            }}
          >
            <IconButton
              onClick={() => {
                setIsMobileMenuToggled(!isMobileMenuToggled);
              }}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween flexDirection="column" gap="3rem">
            <IconButton
              onClick={() => {
                dispatch(setMode());
              }}
            >
              {/* Theme based Icon */}
              {theme.palette.mode === "dark" ? <DarkMode /> : <LightMode />}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(setLogOut());
                    navigate("/");
                  }}
                >
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};
/**
 * Separate theme - Multiple op
 * Upload Files image traditional and using library
 * form validation -  all side
 *
 *
 */
