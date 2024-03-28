import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme/theme.js";
import { LoginPage } from "scenes/Login/LoginPage";
import { HomePage } from "scenes/Home/HomePage";
import { ProfilePage } from "scenes/Profle/ProfilePage";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/** ithu / na nama login page ku kondu porom */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
