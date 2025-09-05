import express from "express";
import passport from "../config/passport.js";

const router = express.Router();
const FRONTEND_URL = process.env.FRONTEND_URL || "https://ecommerceapi-frontend.onrender.com";


router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" })
);


router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${FRONTEND_URL}/login` }),
  (req, res) => {
    const { token } = req.user;

    const isProd = process.env.NODE_ENV === "production";
    res
      .cookie("userToken", token, {
        httpOnly: true,
        secure: isProd ? true : false,        
        sameSite: isProd ? "None" : "Lax",    
        maxAge: 5 * 60 * 60 * 1000,            
      })
      .redirect(FRONTEND_URL);
  }
);

export default router;
