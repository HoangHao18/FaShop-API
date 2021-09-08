import express from 'express';
const router = express.Router();

import {
    getAllOrders,
    createNewOrder,
    getOrderById,
    getOrderByUserId
} from '../controllers/orderController.js';

router.get("/", getAllOrders);
router.post("/", createNewOrder);
router.get("/:orderId", getOrderById);
router.get("/user/:userId", getOrderByUserId);

export default router;
