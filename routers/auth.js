import express from 'express';
const router = express.Router();

//const authController = require("../../controllers/authController");
import {
    register,
    login
} from '../controllers/authController.js';


//authentication va authorization

//authentication: noi ve thong tin cua user dang hoat dong
//authorization: xac dinh  quyen cua user de su dung

// route.get(
//   "/test",
//   jwtAuth,
//   authorize("admin"),
//   asyncMiddleware(async (req, res, next) => {
//     res.status(200).json({ success: true });
//   })
// );

router.post("/register", register);
router.post("/login", login);

export default router;