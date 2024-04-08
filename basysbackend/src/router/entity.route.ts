import * as express from "express";
import { EntityController } from "../controller/entity.controller";
import { authentification } from "../middleware/authentication.middlewate";
import multer = require("multer");
// import { authentification } from "../middleware/authentification";
// import { UserController } from "../controllers/user.controllers";
// import { authorization } from "../middleware/authorization";
// import { AuthController } from "../controllers/auth.controller";
const entityRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where you want to save the files
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    // Specify the filename for the uploaded files
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create a Multer instance with the defined storage
const upload = multer({ storage: storage });
entityRouter.post("/create", EntityController.create);
entityRouter.post(
  "/updateAddress",
  authentification,
  EntityController.updateAddress
);
entityRouter.post(
  "/verification",
  authentification,
  upload.array("images"),
  EntityController.verification
);
entityRouter.get("/get", authentification, EntityController.get);

export default entityRouter;
