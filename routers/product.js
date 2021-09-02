import express from 'express';
const router = express.Router();
import multer from 'multer';


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/product');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        //cb(new Error("..."), true);
        cb(null, true);
    } else {
        cb(null, fale);
    }
}
const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024*1024*5
    // },
    fileFilter: fileFilter
});



import {getAllProducts, 
        getProductById, 
        createNewProduct, 
        updateProductById, 
        deleteProductById
    } from '../controllers/productController.js'; 

router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.post("/", upload.array("image-product", 10), createNewProduct);
router.patch("/:productId",upload.single('image'), updateProductById);
router.delete("/:productId", deleteProductById);

export default router;



//put: -> thay the record cu bang record moi
//patch: -> update field trong record