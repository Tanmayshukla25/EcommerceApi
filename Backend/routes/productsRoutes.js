import express from "express"
import {createForm} from "../controllers/productsControllers.js"
import {CartData} from "../controllers/productsControllers.js"

const router =express.Router();

router.post("/add",createForm);
router.post("/cart",CartData);

export default router;

