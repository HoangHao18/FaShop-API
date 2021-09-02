import express from 'express';
const router = express.Router();
import multer from 'multer';
//const upload = multer({dest: 'uploads/'})

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/user');
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



import {getAllUsers, 
        getUserById, 
        createNewUser, 
        updateUserById, 
        deleteUserById
    } from '../controllers/userController.js'; 

router.get("/all", getAllUsers);
router.get("/:userId", getUserById);
router.post("/", upload.single('image'), createNewUser);
router.patch("/:userId",upload.single('image'), updateUserById);
router.delete("/:userId", deleteUserById);

export default router;



//put: -> thay the record cu bang record moi
//patch: -> update field trong record