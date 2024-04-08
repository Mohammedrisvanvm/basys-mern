import * as express from "express";
// import { authentification } from "../middleware/authentification";
// import { UserController } from "../controllers/user.controllers";
// import { authorization } from "../middleware/authorization";
// import { AuthController } from "../controllers/auth.controller";
import { AdminController } from "../controller/admin.controller";
const adminRouter = express.Router();


adminRouter.post("/signup", AdminController.signup);
adminRouter.post("/signin", AdminController.signin);
adminRouter.get("/", AdminController.get);


export default adminRouter 