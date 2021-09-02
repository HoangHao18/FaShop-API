import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import connectDB  from './database/connectDB.js';
import errorMiddleware from './middleware/errorMiddleware.js';

import user from './routers/user.js';
import category from './routers/category.js'
import manufacture from './routers/manufacture.js'
import product from './routers/product.js'


const app = express();
const PORT = process.env.port || 3000;

//middleware parse body
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use('/uploads',express.static('uploads'))

connectDB();
 
//routers
app.use("/api/v1/user", user);
app.use("/api/v1/category", category);
app.use("/api/v1/manufacture", manufacture);
app.use("/api/v1/product", product );



//
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

