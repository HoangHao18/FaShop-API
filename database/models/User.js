import mongoose from 'mongoose';
//import Schema  from 'mongoose';
import bcrypt from 'bcryptjs';
mongoose.set("runValidators", true);
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Name is required"], 
            unique: true,
            minlength: [3, "Name must have more than 3 characters"]
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            required: true,
            minlength: [6, "Password must be at least 6 characters"],
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
        gender: {
            type: String,
            // enum: ["Nam", "Nữ", Khác], //chi cho phep gia tri trong enum
            required: true,
            default: "Nam", //guest
        },
        role: {
            type: String,
            // enum: ["admin", "guest"], //chi cho phep gia tri trong enum
            required: true,
            default: "guest", //guest
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        image: {
            type: String,
            require: false
        }
    },
    {
        toJSON: { virtuals: true },
        timestamps: true,
    }
);

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.generateAuthToken = async function () {
     // Generate an auth token for the user
    const users = this;
    //const token = jwt.sign({ _id: users._id }, process.env.JWT_KEY);
    user.tokens = users.tokens.concat({ token });
    await users.save();
    return token;
}

UserSchema.statics.comparePassword = async function (password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  };

//module.exports = mongoose.model("User", UserSchema);
export const User = mongoose.model('User', UserSchema);