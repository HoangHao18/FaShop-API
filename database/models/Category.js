import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
            unique: true,
          },
          description: {
            type: String,
            required: [true, "description is required"],
          },
    }
)

export const Category = mongoose.model("Category", CategorySchema);