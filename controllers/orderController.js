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

//get buy id
export const getOrderById = asyncMiddleware(async (req, res, next) => {
  const { orderId } = req.params;

  //tim orderId tren database
  if(!orderId.trim()){
      return next(new ErrorResponse(400, "orderId is empty"));
  }

  const doc = await Order.findById(orderId)
  if (!doc) {
    return next(new ErrorResponse(404, "orderId is not found"));
  }
  res.status(200).json(new SuccessResponse(200, doc));
});

//get buy user id
export const getOrderByUserId = asyncMiddleware(async (req, res, next) => {
  const { userId } = req.params;

  //tim userId tren database
  if(!userId.trim()){
      return next(new ErrorResponse(400, "userId is empty"));
  }
  console.log("userId neeeeeeeee",userId)

  const orders = await Order.find({iduseroder: userId})
  if (!orders) {
    return next(new ErrorResponse(404, "orders empty"));
  }
  console.log("orders neeeeeeeee",orders)
  res.status(200).json(new SuccessResponse(200, orders));
});

/////////////
function randomString(string_length, key_number) {
  let string = "DH0" + key_number;
  const possible ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < string_length; i++)
    string += possible.charAt(Math.floor(Math.random() * possible.length));
  return string;
}

/////////////

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
      productlist
    } = req.body;
    let code = randomString(4,7)
    console.log("Order.count()",Order.count())
    console.log("1. req.body order: ",req.body);
    console.log("1.1. req.body order: ",req.body);
    console.log("run here 1 ");
    const newOrder = new Order({
        code,
        iduseroder,
        name,
        phone,
        address,
        note,
        price_total,
        ship,
        productlist
    });
    console.log("run here 2 ");
    console.log("2. ewOrder order: ",newOrder);
    const saved_order = await newOrder.save();
    //tao thanh cong thi 200 hoac 201
    res.status(200).json(new SuccessResponse(200, saved_order));
  });
  