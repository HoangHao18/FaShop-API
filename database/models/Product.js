//sku,name,price,quantity,description,image,category

import mongoose from 'mongoose';
const { Schema } = mongoose;
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    quantity_total: {
      type: Number,
    //   required: [true, "quantity is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    images:  { 
        type : Array, 
        default : [],
    },
    colors: [
        // {
        //     namecolor: {
        //         type: String,
        //         //required: [true, "quantity is required"],
        //       }, 
        //     size: [
        //         {
        //             namesize: {
        //                 type: String,
        //                 //required: [true, "quantity is required"],
        //               },
        //             quantity:  {
        //                 type: Number,
        //                 // required: [true, "quantity is required"],
        //               }
        //         }
        //     ] 
        // }
    ],
    category: {
      type: String,
      required: [true, "category is required"],
    },
    manufacture: {
        type: String,
        required: [true, "manufacture is required"],
      },
    sku: {
      type: String,
      required: [true, "sku is required"],
      unique: true,
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

ProductSchema.virtual("category_detail", {
  ref: "Category", //from
  localField: "category",
  foreignField: "name",
  justOne: true,
});

ProductSchema.virtual("manufacture_detail", {
    ref: "Manufacture", //from
    localField: "manufacture",
    foreignField: "name",
    justOne: true,
  });

//module.exports = mongoose.model("Product", ProductSchema);
export const Product = mongoose.model('Product', ProductSchema);