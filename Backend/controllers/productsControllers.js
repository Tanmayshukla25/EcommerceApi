import Product from "../models/products.js";

export async function createForm(req, res) {
  try {
    console.log("Req Body:", req.body);
  

    const newProduct = new Product({
      ...req.body,
     
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Product creation failed", details: err.message });
  }
}


export async function CartData(req,res){
    try{

    }catch(error){
        
    }
}