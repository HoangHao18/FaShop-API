import asyncMiddleware from '../middleware/asyncMiddleware.js';
import ErrorResponse from '../model/ErrorResponse.js';
import SuccessResponse from '../model/SuccessResponse.js';

import { Manufacture } from "../database/models/Manufacture.js";

export const getAllManufacture = asyncMiddleware(async (req, res, next) => {
    const manufactures = await Manufacture.find();
    res.status(200).json(manufactures);
});


export const getAllManufactureJustName = asyncMiddleware(async (req, res, next) => {
    const manufactures = await Manufacture.find().select("name -_id");
    res.status(200).json(manufactures);
});


export const getManufactureById = asyncMiddleware(async (req, res, next) => {
    const { manufactureId } = req.params;
    if (!manufactureId.trim()) {
      return next(new ErrorResponse(400, "manufactureId is empty"));
    }
    const manufactures = await Manufacture.findById(manufactureId).catch((err) => {
      return next(new ErrorResponse(404, "manufacture is not found"));
    });
    if (manufactures) {
      res.status(200).json(new SuccessResponse(200, manufactures));
    }
});


export const createNewManufacture = asyncMiddleware(async (req, res, next) => {
    const { name, phone, email, address } = req.body;
    console.log("item: ", name, phone, email, address);
    const manufacture = new Manufacture({
      name, 
      phone, 
      email, 
      address
    });
    console.log("req.body manufacture: ", req.body)
    const newMa = await manufacture.save();
    res.status(200).json(new SuccessResponse(200, newMa));
});



export const updateManufactureById = asyncMiddleware(async (req, res, next) => {
    const { manufactureId } = req.params;
    if (!manufactureId.trim()) {
      return next(new ErrorResponse(400, "manufacture is empty"));
    }
    const updatedCate = await Manufacture.findOneAndUpdate(
      { _id: manufactureId },
      req.body,
      { new: true }
    );
    if (!updatedCate) {
      return next(new ErrorResponse(400, "Can not Update"));
    }
    res.status(200).json(new SuccessResponse(200, updatedCate));
});


export const deleteManufactureById = asyncMiddleware(async (req, res, next) => {
    const { manufactureId } = req.params;
    console.log("manufactureId",manufactureId)
    if (!manufactureId.trim()) {
      return next(new ErrorResponse(400, "manufactureId is empty"));
    }
    const deletedCate = await Manufacture.findByIdAndDelete(manufactureId);
    if (!deletedCate) {
      return next(new ErrorResponse(400, "Can not delete"));
    }
    console.log("deletedCate",deletedCate)
    res
      .status(200)
      .json(
        new SuccessResponse(200, `manufacture has is ${manufactureId} was deleted`)
      );
  });
