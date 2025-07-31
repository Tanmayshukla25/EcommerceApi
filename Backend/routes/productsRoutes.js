import express from "express"
import {createForm, deleteProduct, getAllProducts, getCartData, getSingleProduct, removeData, updateProduct, wishlist} from "../controllers/productsControllers.js"
import {CartData} from "../controllers/productsControllers.js"
import { uploadCloud } from "../middleware/cloudinaryUpload.js";
import checkToken from "../middleware/authCheckMiddleware.js";

const router =express.Router();

router.post("/add",uploadCloud.single("image"),createForm);
router.get("/all", getAllProducts);
router.post("/cart/:id",checkToken,CartData);
router.post("/wishlist/:id",checkToken,wishlist);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/:id", getSingleProduct);
router.get("/cart/data", checkToken, getCartData);
router.delete("/cartData/remove/:productId", removeData);





export default router;

