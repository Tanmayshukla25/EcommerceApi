import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String },
  slug: { type: String },
  category: { type: String },
  images: [{ type: String }],
  quantity: { type: Number },
  originalPrice: { type: Number },  
  discountedPrice: { type: Number },
  description: { type: String },
},{timestamps:true});


const Product = mongoose.model("Product", productSchema);
export default Product;