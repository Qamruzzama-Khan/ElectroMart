import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadCloudinary, deleteCloudinary } from "../utils/Cloudinary.js";
import { formatValue } from "../utils/FormatValue.js";
import {nodeCache} from "../utils/NodeCache.js"
import {Category} from "../models/category.model.js"

// create product
const createProduct = AsyncHandler(async (req, res) => {
  const { name, description, price, sizes, stock, category } = req.body;
  const userId = req.user;

  const productCategory = await Category.findOne({ name: category });

  if (!productCategory) {
    throw new ApiError(409, "Category not exists");
  } 

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
    category: productCategory._id,
    owner: userId,
  });

  const createdProduct = await Product.findById(newProduct._id);
  if (!createdProduct) {
    throw new ApiError(404, "Product did not created");
  }

  nodeCache.del("products");

  return res
    .status(201)
    .json(new ApiResponse(200, createdProduct, "Product added successfully"));
});

// get all products
const getProducts = AsyncHandler(async (req, res) => {
  let products;

  if(nodeCache.has("products")){
    products = JSON.parse(nodeCache.get("products"));
  }else{
    products = await Product.find({}).sort({ createdAt: -1 });
    nodeCache.set("products", JSON.stringify(products))
  }
  return res.status(201).json(new ApiResponse(200, products));
});  

// get products by category
const getProductsByCategory = AsyncHandler(async (req, res) => {
  const {categoryId} = req.params;
  let products;

  products = await Product.find({category: categoryId}).sort({ createdAt: -1 });

  // if(nodeCache.has("products")){
  //   products = JSON.parse(nodeCache.get("products"));
  // }else{
  
  //   nodeCache.set("products", JSON.stringify(products))
  // }
  return res.status(201).json(new ApiResponse(200, products));
});

// update product
const updateProduct = AsyncHandler(async (req, res) => {
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

  nodeCache.del("products");

  return res
    .status(201)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

// delete product
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

  nodeCache.del("products");

  return res
    .status(201)
    .json(new ApiResponse(200, product, "Product deleted successfully"));
});

// get one product
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
  getProductsByCategory
};
