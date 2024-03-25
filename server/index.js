import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";
import path from "path";
import multer from "multer";
import mongoose from "mongoose";
// local module
import { register } from "./controllers/auth.controller.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import { verifyToken } from "./middleware/auth.middleware.js";
import { createPost } from "./controllers/post.controller.js";
import dotenv from "dotenv";
// configuration
const app = express();
const port = process.env.PORT || 6000;
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

/// new packages
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

// set the static file for public files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "/public/assets")));

// File Storage
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage,
});

// Connect the mongoDB then Start the server - one of the way
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    /// server running
    app.listen(port, () => {
      //   console.log("Server is running on port " + port);
      console.log("Server is running on port " + process.env.PORT);
    });
  })
  .catch((err) => console.log("error : " + err.message));

// API route -  Multer - Router with Files
app.post("/api/auth/register", upload.single("picture"), register); // ithuku authendication theva ila and intha route ah nama inga yum protect pannalam
app.post(
  "/api/post/createPost",
  verifyToken,
  upload.single("picture"),
  createPost
); // ithu nama server la files ah upload pandrathuku mattum intha router method ah use pandrom

// API Route
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.get("/api/test", (req, res) => {
  console.log("API is working");
  res.status(200).json("API is working");
});
/**
 * I understand the datamodel - ithula enaku etha maari oru style thought process ituku atha tha work pannuven
 * Ivarkuita nala ideas oda soldraru - enaku suite aguthu
 * Ellathukum base sahand + tutor joes -  My inspiration
 * na complete ah developing la new kind of understanding vanthut iruku
 *
 * Basement enaku strong agidichi ellathaiyum  ipa ennala easy ah pakkava purinjika mudiyum
 * sahand workflow than enaku romba pidichi iruku - atha en manathirila telivana workflow ah vechi irukem - athu than best ana way to develop app and code
 *
 */
