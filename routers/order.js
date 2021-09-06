import express from 'express';
const router = express.Router();

import {
    getAllOrders,
    createNewOrder,

} from '../controllers/orderController.js';

router.get("/", getAllOrders);
router.post("/", createNewOrder);

export default router;
