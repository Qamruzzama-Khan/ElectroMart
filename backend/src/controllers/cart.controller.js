import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Add item to cart
const addItemToCart = AsyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user._id;

  let productQuantity = 1;

  if (quantity) {
    productQuantity = quantity;
  }

  // check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const productPrice = Number(product.price.slice(1));

  // check if cart exists for the user
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [
        {
          product: productId,
          quantity,
          price: product.price,
          subTotal: `\u20B9${productPrice * productQuantity}`,
        },
      ],
      totalBill: `\u20B9${productPrice * productQuantity}`,
    });
  } else {
    // check if the item is already in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product._id.toString() === productId
    );

    if (itemIndex > -1) {
      // update quantity
      cart.items[itemIndex].quantity += productQuantity;

      // old subTotal
      const oldSubTotal = Number(cart.items[itemIndex].subTotal.slice(1));

      // new subTotal
      const newSubTotal = productPrice * productQuantity;

      // update subTotal
      cart.items[itemIndex].subTotal = `\u20B9${oldSubTotal + newSubTotal}`;
    } else {
      // add new item to the cart
      const subTotal = productPrice * productQuantity;
      cart.items.push({
        product: productId,
        quantity: productQuantity,
        price: product.price,
        subTotal: `\u20B9${subTotal}`,
      });
    }
  }

  cart.totalItems = cart.items.length;

  let grandTotal = 0;
  for (let i = 0; i < cart.items.length; i++) {
    const item = cart.items[i];
    const productPrice = Number(item.price.slice(1));
    const subTotal = item.quantity * productPrice;
    grandTotal += subTotal;
  }

  cart.totalBill = `\u20B9${grandTotal}`;

  // save the cart
  await cart.save();

  const newCart = await Cart.findById(cart._id).populate(
    "items.product",
    "name image"
  );

  return res
    .status(201)
    .json(new ApiResponse(200, newCart, "Product added to cart successfuly"));
});

// get cart
const getCart = AsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId })
    .sort({ createdAt: -1 })
    .populate("items.product", "name image");

  if (!cart) {
    throw new ApiError(404, "You are not added items to your cart");
  }

  return res.status(201).json(new ApiResponse(200, cart, "Your cart"));
});

// Remove item from cart
const removeItemFromCart = AsyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new ApiError(404, "You are not added items to your cart");
  }

  const updatedItemsArray = cart.items.filter((item) => {
    return item._id.toString() !== itemId;
  });

  cart.items = updatedItemsArray;
  cart.totalItems = cart.items.length;

  let grandTotal = 0;
  for (let i = 0; i < cart.items.length; i++) {
    const item = cart.items[i];
    const productPrice = Number(item.price.slice(1));
    const subTotal = item.quantity * productPrice;
    grandTotal += subTotal;
  }
  cart.totalBill = `\u20B9${grandTotal}`;

  await cart.save();

  return res
    .status(201)
    .json(new ApiResponse(200, cart, "Product removed from cart successfuly"));
});

// update cart
const updateCart = AsyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new ApiError(404, "You are not added items to your cart");
  }

  if (!quantity) {
    throw new ApiError(400, "Please provide atleast one updating field");
  }

  const updatingItemIndex = cart.items.findIndex((item) => {
    return item._id.toString() === itemId;
  });

  if (updatingItemIndex > -1) {
    // get product price
    const item = cart.items[updatingItemIndex];
    const productPrice = Number(item.price.slice(1));

    // update quantity
    cart.items[updatingItemIndex].quantity = quantity;

    // new subTotal
    const newSubTotal = productPrice * quantity;

    // update subTotal
    cart.items[updatingItemIndex].subTotal = `\u20B9${newSubTotal}`;
  }

  // update cart.totalBill
  let grandTotal = 0;
  for (let i = 0; i < cart.items.length; i++) {
    const item = cart.items[i];
    const productPrice = Number(item.price.slice(1));
    const subTotal = item.quantity * productPrice;
    grandTotal += subTotal;
  }
  cart.totalBill = `\u20B9${grandTotal}`;

  // save the cart
  await cart.save();

  const updatedCart = await Cart.findById(cart._id)
    .sort({ updatedAt: -1 })
    .populate("items.product", "name image");

  return res
    .status(201)
    .json(new ApiResponse(200, updatedCart, "Youre cart updated successfuly"));
});

// delete cart
const deleteCart = AsyncHandler(async (req, res) => {
  const { cartId } = req.params;
  const userId = req.user._id;

  const cart = await Cart.findById(cartId);
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  await Cart.findByIdAndDelete(cartId);

  return res.status(201).json(new ApiResponse(200, "Cart deleted successfuly"));
});

export { addItemToCart, getCart, removeItemFromCart, updateCart, deleteCart };
