import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadCloudinary, deleteCloudinary } from "../utils/Cloudinary.js";
import { formatValue } from "../utils/FormatValue.js";

// create product
const createProduct = AsyncHandler(async (req, res) => {
  // Algorithm for creating new product:
  // 1. get data from req.body
  // 2. validate it empy or not
  // 3. check if product already exists or not by name
  // 4. if product already exists throw api error
  // 5. if not create new product
  // 6. check if new product created or not by finding product with new product._id
  // 7. if not throw api error
  // 6. otherwise send response

  const { name, description, price, sizes, stock } = req.body;
  const userId = req.user;

  // modify product name
  const firstLetterOfName = name.slice(0, 1).toUpperCase();
  const remainingLettersOName = name.slice(1).toLowerCase();
  const modifiedName = firstLetterOfName + remainingLettersOName;

  const product = await Product.findOne({ name: modifiedName });
  if (product) {
    throw new ApiError(400, "Product already exists");
  }

  const productImageLocalPath = req.file?.path;

  if (!productImageLocalPath) {
    throw new ApiError(400, "Product image is required");
  }

  const productImage = await uploadCloudinary(productImageLocalPath);
  if (!productImage) {
    throw new ApiError(400, "Error while uploading image on cloudinary");
  }

  // formate price in INR
  const formattedPrice = formatValue(price)

  const newProduct = await Product.create({
    name: modifiedName,
    description,
    price: formattedPrice,
    stock,
    sizes,
    image: {
      imageUrl: productImage.url,
      imageId: productImage.public_id,
    },
    owner: userId,
  });

  const createdProduct = await Product.findById(newProduct._id);
  if (!createdProduct) {
    throw new ApiError(404, "Product did not created");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdProduct, "Product added successfully"));
});

// get products
const getProducts = AsyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  return res.status(201).json(new ApiResponse(200, products));
});          

// update product
const updateProduct = AsyncHandler(async (req, res) => {
  // Algorithm:
  // 1. get product productId from req.params, and updating data from req.body
  // 2. find product by the productId
  // 3. if product not found throw api error
  // 4. otherwise find the product by productId and update it
  // 5. send response

  const { productId } = req.params;
  const { name, description, price, sizes, stock } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const updatedFields = {};
  if (name) {
    // modify name
    const firstLetterOfName = name.slice(0, 1).toUpperCase();
    const remainingLettersOName = name.slice(1).toLowerCase();
    const modifiedName = firstLetterOfName + remainingLettersOName;
    updatedFields.name = modifiedName;
  }
  if (description) updatedFields.description = description;
  if (sizes) updatedFields.sizes = sizes;
  if (price) updatedFields.price = formatValue(price);
  if (stock) updatedFields.stock = stock;
  
  const productImageLocalPath = req.file?.path;

  if (productImageLocalPath) {
    const publicId = product.image?.imageId;

    // Delete old image if exists
    if (publicId) {
      try {
        const response = await deleteCloudinary(publicId);
        console.log(response);
      } catch (error) {
        throw new ApiError(500, "Error deleting old image");
      }
    }

    try {
      const productImage = await uploadCloudinary(productImageLocalPath);
      updatedFields.image = {
        imageUrl: productImage.url,
        imageId: productImage.public_id,
      };
    } catch (error) {
      throw new ApiError(500, "Error uploading new image");
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { $set: updatedFields },
    { new: true }
  );

  return res
    .status(201)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

const deleteProduct = AsyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Delete image if exists
  const publicId = product.image?.imageId;
  if (publicId) {
    try {
      const response = await deleteCloudinary(publicId);
      console.log(response);
    } catch (error) {
      throw new ApiError(500, "Error deleting old image");
    }
  }

  await Product.findByIdAndDelete(productId);

  return res
    .status(201)
    .json(new ApiResponse(200, product, "Product deleted successfully"));
});

const getOneProduct = AsyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(201).json(new ApiResponse(200, product, "Your product"));
});

export {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getOneProduct,
};
