import asyncMiddleware from '../middleware/asyncMiddleware.js';
import ErrorResponse from '../model/ErrorResponse.js';
import SuccessResponse from '../model/SuccessResponse.js';

import { Category } from "../database/models/Category.js";

export const getAllCategory = asyncMiddleware(async (req, res, next) => {
    const categories = await Category.find();
    res.status(200).json(categories);
});


export const getAllCategoryJustName = asyncMiddleware(async (req, res, next) => {
    const categories = await Category.find().select("name -_id");
    res.status(200).json(categories);
});


export const getCategoryById = asyncMiddleware(async (req, res, next) => {
    const { categoryId } = req.params;
    if (!categoryId.trim()) {
      return next(new ErrorRespone(400, "categoryId is empty"));
    }
    const categories = await Category.findById(categoryId).catch((err) => {
      return next(new ErrorRespone(404, "Category is not found"));
    });
    if (categories) {
      res.status(200).json(new SuccessResponse(200, categories));
    }
});


export const createNewCategory = asyncMiddleware(async (req, res, next) => {
    const { name, description } = req.body;
    const category = new Category({
      name,
      description,
    });
    console.log("thu c", req.body)
    const newCate = await category.save();
    res.status(200).json(new SuccessResponse(200, newCate));
});


export const updateCategoryById = asyncMiddleware(async (req, res, next) => {
    const { categoryId } = req.params;
    if (!categoryId.trim()) {
      return next(new ErrorRespone(400, "Category is empty"));
    }
    const updatedCate = await Category.findOneAndUpdate(
      { _id: categoryId },
      req.body,
      { new: true }
    );
    if (!updatedCate) {
      return next(new ErrorRespone(400, "Can not Update"));
    }
    res.status(200).json(new SuccessResponse(200, updatedCate));
});


export const deleteCategoryById = asyncMiddleware(async (req, res, next) => {
    const { categoryId } = req.params;
    if (!categoryId.trim()) {
      return next(new ErrorRespone(400, "CategoryId is empty"));
    }
    const deletedCate = await Category.findByIdAndDelete(categoryId);
    if (!deletedCate) {
      return next(new ErrorRespone(400, "Can not delete"));
    }
    res
      .status(200)
      .json(
        new SuccessResponse(200, `category has is ${categoryId} was deleted`)
      );
  });
