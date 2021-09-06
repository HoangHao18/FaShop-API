//const jwt = require("jsonwebtoken");

import asyncMiddleware from '../middleware/asyncMiddleware.js';
import ErrorResponse from '../model/ErrorResponse.js';
import SuccessResponse from '../model/SuccessResponse.js';
import { User } from "../database/models/User.js";

export const register = asyncMiddleware(async (req, res, next) => {
    const { name, email, phone, address, password, gender } = req.body;
    let img = "";
    if(req.file){
        img = req.file.path;
    }
    const role = 'guest'
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
    //Su dung UserSchema de luu du lieu len MongoDB
});

export const login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  const isExistEmail = await User.findOne({ email });
  if (isExistEmail) {
    //neu ton tai user tren database
    const isMatchPassword = await User.comparePassword(
      password,
      isExistEmail.password
    );
    if (isMatchPassword) {
      //generate jsonwebtoken
      //payload la nhung thu muon luu trong token
      // const token = jwt.sign(
      //   {
      //     //payload
      //     email: isExistEmail.email,
      //     name: isExistEmail.name,
      //     phone: isExistEmail.phone,
      //     address: isExistEmail.address,
      //     role: isExistEmail.role,
      //   },
      //   process.env.JWT_KEY //secret key
      // );
      // console.log(token);

      return res.status(200).json(
        new SuccessResponse(200, {
          // token,
          id: isExistEmail._id,
          role: isExistEmail.role,
          email: isExistEmail.email,
          name: isExistEmail.name,
          phone: isExistEmail.phone,
          address: isExistEmail.address,
          gender: isExistEmail.gender,
          image: isExistEmail.image
        })
      );
    } else {
      return next(new ErrorResponse(404, "Password is incorrect"));
    }
  } else {
    //404: http status khi khong tim thay tai nguyen
    return next(new ErrorResponse(404, "Email is not found"));
  }
});
