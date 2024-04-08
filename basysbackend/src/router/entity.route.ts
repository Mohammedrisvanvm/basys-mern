import * as express from "express";
import { EntityController } from "../controller/entity.controller";
import { authentification } from "../middleware/authentication.middlewate";
// import { authentification } from "../middleware/authentification";
// import { UserController } from "../controllers/user.controllers";
// import { authorization } from "../middleware/authorization";
// import { AuthController } from "../controllers/auth.controller";
const entityRouter = express.Router();


entityRouter.post("/create", EntityController.create);
entityRouter.post("/updateAddress", EntityController.updateAddress);
entityRouter.get("/get",authentification, EntityController.get);
entityRouter.post("/changePassword", EntityController.changePassword);


export default entityRouter 