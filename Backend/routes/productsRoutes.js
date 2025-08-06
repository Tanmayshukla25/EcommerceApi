import express from "express";
import {
  createForm,
  deleteProduct,
  getAllProducts,
  getCartData,
  getSingleProduct,
  getWishlistData,
  removeData,
  updateProduct,
  wishlist,
  wishListRemoveData,
} from "../controllers/productsControllers.js";
import { CartData } from "../controllers/productsControllers.js";
import { uploadCloud } from "../middleware/cloudinaryUpload.js";
import { checkToken } from "../middleware/authCheckMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /product/add:
 *   post:
 *     summary: Add new product
 *     description: Upload a product with image using Cloudinary
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The product image to upload
 *     responses:
 *       201:
 *         description: Product created successfully
 */

router.post("/add", uploadCloud.single("image"), createForm);

/**
 * @swagger
 * /product/all:
 *   get:
 *     summary: Get all products
 *     description: Returns a list of all available products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   category:
 *                     type: string
 */

router.get("/all", getAllProducts);

/**
 * @swagger
 * /product/cart/{id}:
 *   post:
 *     summary: Add product to cart
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product added to cart
 */
router.post("/cart/:id", checkToken, CartData);

/**
 * @swagger
 * /product/wishlist/{id}:
 *   post:
 *     summary: Add product to wishlist
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product added to wishlist
 */
router.post("/wishlist/:id", checkToken, wishlist);

router.get("/wishlist/Data", checkToken, getWishlistData);

/**
 * @swagger
 * /product/update/{id}:
 *   put:
 *     summary: Update a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put("/update/:id", uploadCloud.single("image"),  updateProduct);

/**
 * @swagger
 * /product/delete/{id}:
 *   delete:
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete("/delete/:id", deleteProduct);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get single product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 */
router.get("/:id", getSingleProduct);

/**
 * @swagger
 * /product/cart/data:
 *   get:
 *     summary: Get cart items
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of cart items
 */

router.get("/cart/data", checkToken, getCartData);

/**
 * @swagger
 * /product/cartData/remove/{productId}:
 *   delete:
 *     summary: Remove product from cart
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to remove
 *     responses:
 *       200:
 *         description: Product removed from cart
 */
router.delete("/cartData/remove/:id", checkToken, removeData);
router.delete("/wishList/remove/:id", checkToken, wishListRemoveData);

export default router;
