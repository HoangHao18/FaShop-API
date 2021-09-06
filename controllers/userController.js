import isValidObjectId  from 'mongoose';
import asyncMiddleware from '../middleware/asyncMiddleware.js';
import ErrorResponse from '../model/ErrorResponse.js';
import SuccessResponse from '../model/SuccessResponse.js';
import path from 'path';

import { User } from "../database/models/User.js";


export const getAllUsers = asyncMiddleware(async (req, res, next) => {
    // const users = await User.find().populate({
    //     path: "role_detail",
    //     select: { role_name: 1, role_desc: 1},
    // })

    const users = await User.find();

    console.log("mmm mk",users.image);
    console.log("mmm",users);
    if(!users.length){//mang rong trong javascript la true
        return next(new ErrorResponse(404, "No users"));
    }
    res.status(200).json(users);
});


export const getUserById = asyncMiddleware(async (req, res, next) => {
    console.log(req.params.UserId);
    const { userId } = req.params;
    if(!userId.trim()){
        return next(new ErrorResponse(400, "userId is empty"));
    }
    const user = await User.findById(userId)
        .select("-password")  
        .catch((err) => {
            return next(new ErrorResponse(404, "User is not found"));
        });
    if(user){
        res.status(200).json(new SuccessResponse(200, user));
    }
});


export const createNewUser = asyncMiddleware(async (req, res, next) => {
    const { name, email, phone, address, password, gender, role } = req.body;
    console.log("req.body",req.body);
    console.log("req.file", req.file);
    // let results = req.file.map((file) => {
    //     return {
    //         mediaName: file.fieldname,
    //         origMediaName: file.originalname,
    //         mediaSource: 'http://' + req.headers.host + config.const.path.productReviewMedia + file.filename
    //     }
    // });
    //let results = 'http://' + req.headers.host + config.const.path.pr + req.file.filename;
    //console.log("results", results);
    console.log("req.headers",  req.headers);

    let img = "";
    if(req.file){
        img = req.file.path;
    }
    const newUser = new User({
        name,
        email,
        phone,
        address,
        password,
        gender,
        role,
        image: img
    });
    console.log("newUser: ", newUser)
    const saved_user = await newUser.save();
    res.status(201).json(saved_user);//tao thanh cong thi 200 hoac 201
});


export const updateUserById = asyncMiddleware(async (req, res, next) => {
    const { userId } = req.params;
    const { name, email, phone, address, password, role, gender } = req.body;
    console.log(req.body);
    if (!userId.trim()) {
        return next(new ErrorRespone(400, "userId is empty"));
    }
    //validate ObjetcId
    if (!isValidObjectId(userId)) {
        return next(new ErrorRespone(400, "Id is invalid"));
    }
    const userNUD = await User.findById(userId);//user need update
    if(!userNUD){//neu khong tim thay user tren database
        return next(new ErrorRespone(404, "User is not found"));
    }
    userNUD.name = name;
    userNUD.email = email;
    userNUD.phone = phone;
    userNUD.address = address;
    userNUD.password = password;
    userNUD.gender = gender;
    userNUD.role = role;
    userNUD.image = req.file.path;
    const updatedUser = await doc.save();
    if (!updatedUser) {
      return next(new ErrorRespone(400, "Can not update"));
    }
    res.status(200).json(new SuccessResponse(200, updatedUser));
});

export const saveCartUserById = asyncMiddleware(async (req, res, next) => {
   // const { userId } = req.params;
    const { userId, cart } = req.body;
    console.log(req.body);
    if (!userId.trim()) {
        return next(new ErrorRespone(400, "userId is empty"));
    }
    //validate ObjetcId
    if (!isValidObjectId(userId)) {
        return next(new ErrorRespone(400, "Id is invalid"));
    }
    const userNUD = await User.findById(userId);//user need update
    if(!userNUD){//neu khong tim thay user tren database
        return next(new ErrorRespone(404, "User is not found"));
    }
    userNUD.name = userNUD.name;
    userNUD.email = userNUD.email;
    userNUD.phone = userNUD.phone;
    userNUD.address = userNUD.address;
    userNUD.password = userNUD.password;
    userNUD.gender = userNUD.gender;
    userNUD.role = userNUD.role;
    userNUD.image = userNUD.image;
    userNUD.cart = cart;
    const updatedUser = await doc.save();
    if (!updatedUser) {
      return next(new ErrorRespone(400, "Can not update"));
    }
    res.status(200).json(new SuccessResponse(200, updatedUser));
});


export const deleteUserById = asyncMiddleware(async (req, res, next) => {
    const { userId } = req.params;
    if (!userId.trim()) {
        return next(new ErrorRespone(400, "userId is empty"));
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return next(new ErrorRespone(400, "Can not delete"));
    }
    res.status(200).json(new SuccessResponse(200));
});

//export default userController;