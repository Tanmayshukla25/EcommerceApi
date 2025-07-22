import Product from "../models/products.js";
import User from "../models/user.js";
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
    res
      .status(500)
      .json({ error: "Product creation failed", details: err.message });
  }
}


export async function CartData(req, res) {
  try {
    const userId = req.body.userId;  
        const productId = req.params.id; 
    const quantity = req.body.quantity || 1;

    console.log("User:", userId, "Product:", productId);

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const user = await User.findById(userId).populate("cart.product");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingItem = user.cart.find(
      (item) => item.product._id.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();

    res.status(200).json({ message: "Cart updated successfully", cart: user.cart });
  } catch (error) {
    console.error("Cart error:", error);
    res.status(500).json({ error: "Error updating cart", details: error.message });
  }
}

export async function wishlist(req, res) {
  try {
    const userId = req.body.userId;
    const productId = req.params.id;

    console.log("User:", userId, "Product:", productId);

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const user = await User.findById(userId).populate("wishlist");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const alreadyInWishlist = user.wishlist.some(
      (item) => item._id.toString() === productId
    );

    if (alreadyInWishlist) {
      return res.status(200).json({ message: "Product already in wishlist", wishlist: user.wishlist });
    }

    user.wishlist.push(productId);
    await user.save();

    res.status(200).json({ message: "Product added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error("Wishlist error:", error);
    res.status(500).json({ error: "Error updating wishlist", details: error.message });
  }
}
