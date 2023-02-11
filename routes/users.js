import express from "express";

import {
  signin,
  signup,
  verifyEmail,
  resetPassword,
  updatePasswordForReset,
  updatePassword,
  createUser,
} from "../controllers/user.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", createUser, signup);
router.post("/verify-email", verifyEmail);
router.post("/reset-password", resetPassword);
router.post("/update-password-for-reset", updatePasswordForReset);
router.patch("/update-password", updatePassword);

//router.post("/update-password", auth, updatePassword);

export default router;
