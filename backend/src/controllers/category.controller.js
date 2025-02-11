import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Category } from "../models/category.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadCloudinary, deleteCloudinary } from "../utils/Cloudinary.js";
import {nodeCache} from "../utils/NodeCache.js"

// create category
const createCategory = AsyncHandler(async (req, res) => {
  const { name } = req.body;
  const userId = req.user;

  const category = await Category.findOne({ name });
  if (category) {
    throw new ApiError(400, "Category already exists");
  }

  const categoryImageLocalPath = req.file?.path;

  if (!categoryImageLocalPath) {
    throw new ApiError(400, "Category image is required");
  }

  const categoryImage = await uploadCloudinary(categoryImageLocalPath);
  if (!categoryImage) {
    throw new ApiError(400, "Error while uploading image on cloudinary");
  }

  const newCategory = await Category.create({
    name,
    image: {
      imageUrl: categoryImage.url,
      imageId: categoryImage.public_id,
    },
    owner: userId,
  });

  const createdCategory = await Category.findById(newCategory._id);
  if (!createdCategory) {
    throw new ApiError(404, "Category did not created");
  }

  nodeCache.del("categories");

  return res
    .status(201)
    .json(new ApiResponse(200, createdCategory, "Category created successfully"));
});

// get cateogries
const getCategories = AsyncHandler(async (req, res) => {
  let categories;

  if(nodeCache.has("categories")){
    categories = JSON.parse(nodeCache.get("categories"));
  }else{
    categories = await Category.find({}).sort({ createdAt: -1 });
    nodeCache.set("categories", JSON.stringify(categories))
  }
  return res.status(201).json(new ApiResponse(200, categories));
});          

// update category
const updateCategory = AsyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const updatedFields = {};
  if (name) {
    updatedFields.name = name;
  }
  
  const categoryImageLocalPath = req.file?.path;

  if (categoryImageLocalPath) {
    const publicId = category.image?.imageId;

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
      const categoryImage = await uploadCloudinary(categoryImageLocalPath);
      updatedFields.image = {
        imageUrl: categoryImage.url,
        imageId: categoryImage.public_id,
      };
    } catch (error) {
      throw new ApiError(500, "Error uploading new image");
    }
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    { $set: updatedFields },
    { new: true }
  );

  nodeCache.del("categories");

  return res
    .status(201)
    .json(new ApiResponse(200, updatedCategory, "Category updated successfully"));
});

// delete category
const deleteCategory = AsyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  // Delete image if exists
  const publicId = category.image?.imageId;
  if (publicId) {
    try {
      const response = await deleteCloudinary(publicId);
      console.log(response);
    } catch (error) {
      throw new ApiError(500, "Error deleting old image");
    }
  }

  await Category.findByIdAndDelete(categoryId);

  nodeCache.del("categories");

  return res
    .status(201)
    .json(new ApiResponse(200, category, "Category deleted successfully"));
});

export {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
