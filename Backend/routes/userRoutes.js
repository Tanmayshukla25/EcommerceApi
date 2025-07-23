import express from "express";

import {loginUser,registerUser} from "../controllers/userControllers.js";

import {uploadCloud} from "../middleware/cloudinaryUpload.js";
import checkToken from "../middleware/authCheckMiddleware.js";



const router = express.Router();

router.post("/login",loginUser)
router.post("/register",uploadCloud.single("image"),registerUser);
router.post("/checkToken",checkToken ,(req,res)=>{
    res.json({User:req.User});
} );

export default router; 