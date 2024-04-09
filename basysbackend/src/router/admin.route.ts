import * as express from "express";
// import { authentification } from "../middleware/authentification";
// import { UserController } from "../controllers/user.controllers";
// import { authorization } from "../middleware/authorization";
// import { AuthController } from "../controllers/auth.controller";
import { AdminController } from "../controller/admin.controller";
import { authentification } from "../middleware/authentication.middlewate";
const adminRouter = express.Router();


adminRouter.post("/signup", AdminController.signup);
adminRouter.post("/signin", AdminController.signin);
adminRouter.get("/",authentification, AdminController.get);
adminRouter.get("/entities", AdminController.entities);
adminRouter.get("/users", AdminController.users);
adminRouter.post("/user/create", AdminController.createUser);


export default adminRouter 