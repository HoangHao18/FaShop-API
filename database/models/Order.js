//sku,name,price,quantity,description,image,category

import mongoose from 'mongoose';
const { Schema } = mongoose;
const OrderSchema = new Schema(
  {
    iduseroder:{
        type:String
    },
    code:{
        type: String,
        required: [true, "code is required"],
        //unique: true,
    } ,
    name: {
      type: String,
      required: [true, "name is required"],
    },
    phone: {
        type: String,
        required: true,
        minlength: [10, "Phone must be at least 10 characters"],
    },
    address: {
        type: String,
        require: true,
    },
    note: {
        type: String,
        
    },
    price_total: {
      type: Number,
      required: [true, "price is required"],
    },

    ship: {
        type: Number,
      //   required: [true, "quantity is required"],
    },
    status:{
        type: String,
        // enum: ["Chờ Duyệt", "Thành Công"], //chi cho phep gia tri trong enum
        required: true,
        default: "Chờ Duyệt", 
    },
    productlist:[]

  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

// ProductSchema.virtual("category_detail", {
//   ref: "Category", //from
//   localField: "category",
//   foreignField: "name",
//   justOne: true,
// });

// ProductSchema.virtual("manufacture_detail", {
//     ref: "Manufacture", //from
//     localField: "manufacture",
//     foreignField: "name",
//     justOne: true,
//   });

//module.exports = mongoose.model("Product", ProductSchema);
export const Order = mongoose.model('Order', OrderSchema);