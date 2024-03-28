import { useTheme } from "@emotion/react";
import { DynamicForm } from "@mui/icons-material";
import { Box, useMediaQuery, Typography } from "@mui/material";
import React from "react";

export const LoginPage = () => {
  // theme setting
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)"); // ithu big screen ah irunthichina true return pannum
  const dark = theme.palette.neutral.dark;

  return (
    <Box>
      {/* Header */}
      <Box
        width="100%"
        padding="1rem 6%"
        textAlign="center"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          sx={{
            "&:hover": {
              color: dark,
              cursor: "pointer",
            },
          }}
        >
          SoicalPedia
        </Typography>
      </Box>

      {/* Form Widget */}
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          color="primary"
          textAlign="center"
          sx={{
            mb: "1.5rem",
          }}
        >
          Welcome to SoicoPedia, the Social Media for Sociopaths!
        </Typography>
        <DynamicForm />
      </Box>
    </Box>
  );
};
