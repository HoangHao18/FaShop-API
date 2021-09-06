import isValidObjectId  from 'mongoose';
import asyncMiddleware from '../middleware/asyncMiddleware.js';
import ErrorResponse from '../model/ErrorResponse.js';
import SuccessResponse from '../model/SuccessResponse.js';
import path from 'path';

import { Order } from '../database/models/Order.js';


export const getAllOrders  = asyncMiddleware(async (req, res, next) => {
    const orders = await Order.find();

    if(!orders.length){//mang rong trong javascript la true
        return next(new ErrorResponse(404, "No order"));
    }
    res.status(200).json(orders);
});

//create new
  export const createNewOrder = asyncMiddleware(async (req, res, next) => {
    const {
      iduseroder,
      name,
      phone,
      address,
      note,
      price_total,
      ship,
      colors,
      productlist
    } = req.body;
    const code = "DHTEST"
    // console.log(req.body);
    const newOrder = new Order({
        code,
        iduseroder,
        name,
        phone,
        address,
        note,
        price_total,
        quantity_total,
        ship,
        colors,
        productlist
    });
    console.log(newOrder);
    const saved_order = await newOrder.save();
    //tao thanh cong thi 200 hoac 201
    res.status(200).json(new SuccessResponse(200, saved_order));
  });
  