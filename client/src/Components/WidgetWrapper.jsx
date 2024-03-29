import { Box } from "@mui/material";
import { styled } from "@mui/system";
const WidgetWrapper = styled(Box)(
  (
    { theme } // inga theme props ah destructure pandrom
  ) => ({
    backgroundColor: theme.palette.background.alt,
    padding: "1rem 1rem 0.75rem 1rem",
    borderRadius: "0.75rem",
  })
);
export default WidgetWrapper;
/**
 * mui la ore name la ,components multiple packages la iruku ithu konja funky ah iruku
 *
 */
