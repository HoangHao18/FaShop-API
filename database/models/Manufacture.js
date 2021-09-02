import mongoose from "mongoose";

const ManufactureSchema =  new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
            unique: true,
          },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
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
        isActive: {
            type: Boolean,
            default: true,
        },
    }
)

export const Manufacture = mongoose.model("Manufacture", ManufactureSchema);