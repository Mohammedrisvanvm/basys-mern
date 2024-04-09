import * as express from "express";
import { UserController } from "../controller/user.controller";
import { authentification } from "../middleware/authentication.middlewate";
// import { authentification } from "../middleware/authentification";
// import { UserController } from "../controllers/user.controllers";
// import { authorization } from "../middleware/authorization";
// import { AuthController } from "../controllers/auth.controller";
const userRouter = express.Router();


userRouter.post("/signup", UserController.signup);
userRouter.post("/signin", UserController.signin);
userRouter.post("/changePassword", UserController.changePassword);
userRouter.patch("/edit",authentification, UserController.editUser);


export default userRouter 