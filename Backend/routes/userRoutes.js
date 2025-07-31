import express from "express";

import {loginUser,logoutUser,registerUser} from "../controllers/userControllers.js";

import {uploadCloud} from "../middleware/cloudinaryUpload.js";
import checkToken from "../middleware/authCheckMiddleware.js";



const router = express.Router();
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     description: Authenticates user using email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login",loginUser)

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register new user
 *     description: Creates a new user with image upload (via Cloudinary)
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Registration error
 */
router.post("/register",uploadCloud.single("image"),registerUser);
/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Logout user
 *     description: Logs the user out by clearing cookie/token
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post("/logout", logoutUser);
/**
 * @swagger
 * /user/checkToken:
 *   get:
 *     summary: Check if token is valid
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Valid user session
 *       401:
 *         description: Unauthorized or invalid token
 */
router.get("/checkToken",checkToken ,(req,res)=>{
    res.json({User:req.User});
} );

export default router; 