import express from 'express';
const router = express.Router();

import {
    getAllCategory,
    getAllCategoryJustName,
    getCategoryById,
    createNewCategory,
    updateCategoryById,
    deleteCategoryById

} from '../controllers/categoryController.js';

router.get("/", getAllCategory);
router.get("/all-name", getAllCategoryJustName);
router.get("/:categoryId", getCategoryById);
router.post("/", createNewCategory);
router.patch("/:categoryId", updateCategoryById);
router.delete("/:categoryId", deleteCategoryById);

export default router;
