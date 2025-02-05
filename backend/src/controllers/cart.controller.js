import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { formatValue } from "../utils/FormatValue.js";

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

  const productPrice = parseFloat(product.price.replace(/[^\d.-]/g, ''));

  const subTotal = productPrice * productQuantity;

  const formattedSubtotal = formatValue(subTotal);

  const totalBill = productPrice * productQuantity;

  const formattedTotalBill = formatValue(totalBill);

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
          subTotal: formattedSubtotal,
        },
      ],
      totalBill: formattedTotalBill,
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
      const oldSubTotal = parseFloat(cart.items[itemIndex].subTotal.replace(/[^\d.-]/g, ''));

      // new subTotal
      const newSubTotal = productPrice * productQuantity;

      // update subTotal
      const updatedSubtotal = oldSubTotal + newSubTotal;

      const formattedUpdatedSubtotal = formatValue(updatedSubtotal);

      cart.items[itemIndex].subTotal = formattedUpdatedSubtotal;
    } else {
      // add new item to the cart
      const subTotal = productPrice * productQuantity;

      const formattedSubtotal = formatValue(subTotal);

      cart.items.push({
        product: productId,
        quantity: productQuantity,
        price: product.price,
        subTotal: formattedSubtotal,
      });
    }
  }

  cart.totalItems = cart.items.length;

  let grandTotal = 0;
  for (let i = 0; i < cart.items.length; i++) {
    const item = cart.items[i];
    const productPrice =  parseFloat(item.price.replace(/[^\d.-]/g, ''));
    const subTotal = item.quantity * productPrice;
    grandTotal += subTotal;
  }

  const formattedGrandTotal = formatValue(grandTotal);

  cart.totalBill = formattedGrandTotal;

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
    const productPrice = parseFloat(item.price.replace(/[^\d.-]/g, ''));
    const subTotal = item.quantity * productPrice;
    grandTotal += subTotal;
  }
  const formattedGrandTotal = formatValue(grandTotal);

  cart.totalBill = formattedGrandTotal;

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
    const productPrice = parseFloat(item.price.replace(/[^\d.-]/g, ''));

    // update quantity
    cart.items[updatingItemIndex].quantity = quantity;

    // new subTotal
    const newSubTotal = productPrice * quantity;

    const formattedNewSubtotal = formatValue(newSubTotal);

    // update subTotal
    cart.items[updatingItemIndex].subTotal = formattedNewSubtotal;
  }

  // update cart.totalBill
  let grandTotal = 0;
  for (let i = 0; i < cart.items.length; i++) {
    const item = cart.items[i];
    const productPrice = parseFloat(item.price.replace(/[^\d.-]/g, ''));
    const subTotal = item.quantity * productPrice;
    grandTotal += subTotal;
  }

  const formattedGrandTotal = formatValue(grandTotal);

  cart.totalBill = formattedGrandTotal;

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

  const cart = await Cart.findById(cartId);
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  await Cart.findByIdAndDelete(cartId);

  return res.status(201).json(new ApiResponse(200, "Cart deleted successfuly"));
});

export { addItemToCart, getCart, removeItemFromCart, updateCart, deleteCart };
