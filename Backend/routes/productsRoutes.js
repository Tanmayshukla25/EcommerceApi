import express from "express"
import {createForm, wishlist} from "../controllers/productsControllers.js"
import {CartData} from "../controllers/productsControllers.js"

const router =express.Router();

router.post("/add",createForm);
router.post("/cart/:id",CartData);
router.post("/wishlist/:id",wishlist);

export default router;

