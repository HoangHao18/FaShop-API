import express from 'express';
import {
    getAllManufacture,
    getAllManufactureJustName,
    getManufactureById,
    createNewManufacture,
    updateManufactureById,
    deleteManufactureById

} from '../controllers/manufactureController.js';
const router = express.Router();

router.get("/", getAllManufacture);
router.get("/all-name", getAllManufactureJustName);
router.get("/:manufactureId", getManufactureById);
router.post("/", createNewManufacture);
router.patch("/:manufactureId", updateManufactureById);
router.delete("/:manufactureId", deleteManufactureById);

export default router;
