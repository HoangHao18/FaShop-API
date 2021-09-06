import isValidObjectId  from 'mongoose';
import asyncMiddleware from '../middleware/asyncMiddleware.js';
import ErrorResponse from '../model/ErrorResponse.js';
import SuccessResponse from '../model/SuccessResponse.js';
import path from 'path';

import { Product } from "../database/models/Product.js";

export const getAllProducts = asyncMiddleware(async (req, res, next) => {
  const products = await Product.find();
  
  if(!products.length){//mang rong trong javascript la true
    return next(new ErrorResponse(404, "No product"));
  }
  res.status(200).json(products);
});


export const getProductById = asyncMiddleware(async (req, res, next) => {
    const { productId } = req.params;
  
    //tim productId tren database
    if(!productId.trim()){
        return next(new ErrorResponse(400, "productId is empty"));
    }

    const doc = await Product.findById(productId).populate({
      path: "category_detail",
    });
    if (!doc) {
      return next(new ErrorResponse(404, "productId is not found"));
    }
    res.status(200).json(new SuccessResponse(200, doc));
  });

  export const getProductByCategory = asyncMiddleware(async (req, res, next) => {
    const { productCategory } = req.params;
  
    //tim productId tren database
    if(!productCategory.trim()){
        return next(new ErrorResponse(400, "productId is empty"));
    }

    const products = await Product.find({"category":productCategory});
  
    if(!products.length){//mang rong trong javascript la true
      return next(new ErrorResponse(404, "No product"));

    }
    res.status(200).json(new SuccessResponse(200, doc));
  });


export const createNewProduct = asyncMiddleware(async (req, res, next) => {
  const {
    sku,
    name,
    price,
    category,
    manufacture,
    colors,
    description,
    
  } = req.body;
  // console.log(req.body);
  let imgs = [];
  console.log("req.files",req.files)
  if(req.files.length > 0){
    req.files.map((item,index)=>{
        imgs.push(item.path)
    })
  }
  const newProduct = new Product({
    sku,
    name,
    price,
    category,
    manufacture,
    colors,
    description,
    images: imgs,
  });
  console.log(newProduct);
  const saved_product = await newProduct.save();
  //tao thanh cong thi 200 hoac 201
  res.status(201).json(saved_product);
});


export const deleteProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;

  //tim productId tren database
  const doc = await Product.findByIdAndDelete(productId);
  if (!doc) {
    return next(new ErrorResponse(404, "productId is not found"));
  }
  res
    .status(200)
    .json(new SuccessResponse(200, `product has is ${productId} was deleted`));
});

export const updateProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;

  if (!productId.trim()) {
    return next(new ErrorResponse(400, "productId is empty"));
  }



  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    req.body,
    {
      new: true,
    }
  );
  if (!updatedProduct) {
    return next(new ErrorRespone(400, "Can not Update"));
  }
  res.status(200).json(new SuccessResponse(200, updatedProduct));
});
