import mongoose from 'mongoose';

const connectDB = () => {
    try {
        if (!mongoose.connection.readyState) {
          mongoose
            .connect("mongodb://localhost:27017/FaShop", {
              useNewUrlParser: true,
              useFindAndModify: false,
              useUnifiedTopology: true,
              useCreateIndex: true,
            })
            .then(() => {
              console.log("DB is connected");
            });
        }
    } catch (error) {}
}
//exports.connectDB = connectDB;
export default connectDB;