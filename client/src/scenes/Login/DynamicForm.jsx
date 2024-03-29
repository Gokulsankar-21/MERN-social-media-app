import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import { useTheme } from "@emotion/react";
import { FlexBetween } from "Components/FlexBetween";
import { EditOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogIn } from "State/Redux";
import { useState } from "react";

// Schema for Form validation
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  picture: yup.string().required("required"),
});
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

// initial values to formik - intha form la nama yup validation ah mingle panni work pandrom
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  picture: "",
};
const initialValuesLogin = { email: "", password: "" };
export const DynamicForm = () => {
  // inga same page layae - same route layae reg and login manage pandrom
  const [pageType, setPageType] = useState("login");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  //consistent kaga itha boolean ah use panni build panna porom
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  // theme
  const { palette } = useTheme();
  // responsive form
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // React Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // API Call for Authentication
  const registetUser = async (values, onSubmitProps) => {
    // ithhu params ah travel panni vanthu iruku but ithu form data va ila
    // itha image oda default browser form data va matha js interface iruku
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }
    // specific ah image path name ah set panuvom for  user image filepath name
    formData.append("profilePic", values.picture.name);
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: formData,
        //ipa formData + multer + middlware + multi part file hanling ah innum nalla purinjikite
        // formData -  x-www-form-urlencoded typpe nama anupurom - files ithula chunck ah irukum
        // atha nama backend la bodyparser la decode panni -
      });
      const data = await res.json();
      if (data && res.ok) {
        setPageType("login"); // inga complete ah login pannathuku aprm tham global state la store pannuvom
        onSubmitProps.resetForm();
      }
    } catch (error) {
      console.error(error.message);
      setShowError(error.message || error);
    }
  };
  const loginUser = async (values, onSubmitProps) => {
    console.log(values);
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(
          setLogIn({
            user: data.restUserData,
            token: data.token,
          }) // functional programming ah base panni ithu workflow irukum
        );
        navigate("/home");
        onSubmitProps.resetForm();
      }
    } catch (error) {
      console.error(error.message);
      setShowError(error.message || error);
    }
  };
  // handle the form Submit
  // ithu formik kula poitu athu extra props add agitu na kudutha intha handler ah callback ah namku work panna vekum
  // athulla 2 params anupum athu values and onSubmitProps
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await loginUser(values, onSubmitProps);
    if (isRegister) await registetUser(values, onSubmitProps);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      validationSchema={isLogin ? loginSchema : registerSchema}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4,minmax(0,1fr))"
            sx={{
              // mobile ku 4 column um onna mathrom
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {/* Ithu Dynamic form - register ah iruntha regist elements varum and login ah iruntha 2 elements varum */}
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
                {/* DropZone */}
                <Box
                  gridColumn={"span 4"}
                  border={`2px dashed ${palette.primary.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add a Picture</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            {/* Login form + register kum  varu */}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{
                gridColumn: "span 4",
              }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                gridColumn: "span 4",
              }}
            />
          </Box>
          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": {
                  //   backgroundColor: palette.primary.main,
                  color: palette.primary.main,
                },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(pageType === "login" ? "register" : "login");
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Signup here"
                : "ALready have an account? Login here"}
            </Typography>
          </Box>
          {showError && <p style={{ color: "red" }}>{showError}</p>}
        </form>
      )}
    </Formik>
  );
};
/**
 *
 * formik and yup la clarity innum veum
 * so ivaru top-to-bottom order ah poduraru
 *
 *
 * inga nama content-type - multi-part/form-data nu set panna boundary um set pannanum
 * but na req header la ethuvum, set pannala ana athu default ah application/json ah anupi iruku
 * so, nama image blob dta bindary data va send panni iruku
 * and backend la multer itha first capture pannidichi
 * because nama sett panna form enctype='multi-part' ithu formik set pannikum
 *
 * indha form multi-part form than pakkava req headers la check panniten
 * formik boundary ah create pannikithu
 * en diskstorage layum user profile store aguthu
 * so multer pakkava work panniyachi
 * ithu nama local computer and hosting server la store pandra one of the way
 * instead of image server pathila
 *      firebase and cloudinary pathila nama hosting layae ella media manage pannikirom
 *  */
/**
 *
 * user profile picture name -  frontend localserver/localcomputer moolima get pandrom - ithu multer irukura nala- and media managemeent nama hosting serverla manage pandrthunala
 * authentication - cookies ah vechi panuvom
 *  inga headers la vechi manual ah Bearer add apnni set pannrom  - backend la headers-Authorization ah vechi validate pandrom
 *
 * @useEffect
 * ithu component render agum bothu call agum - load agum bothu nu sollalam - many ways to say than
 * but actual wokflow ithu than
 *
 */
