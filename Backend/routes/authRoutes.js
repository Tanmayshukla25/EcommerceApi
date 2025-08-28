import express from "express";
import passport from "../config/passport.js";

const router = express.Router();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Step 1: Google pe bhejo
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" })
);

// Step 2: Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${FRONTEND_URL}/login` }),
  (req, res) => {
    const { token } = req.user;

    const isProd = process.env.NODE_ENV === "production";
    res
      .cookie("userToken", token, {
        httpOnly: true,
        secure: isProd ? true : false,         // local dev: false; prod: true
        sameSite: isProd ? "None" : "Lax",     // prod (cross-site) => None
        maxAge: 5 * 60 * 60 * 1000,            // 5h
      })
      .redirect(FRONTEND_URL); // login ke baad frontend pe
  }
);

export default router;
