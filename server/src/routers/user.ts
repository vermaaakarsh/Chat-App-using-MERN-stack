import { Router } from "express";

import { isAuthenticated } from "../middlewares/isAuthentiacated";
import { getUser, updateUser } from "../controllers/user";
import {
  validateId,
  validateObjectToUpdateUser,
} from "../middlewares/validators/userValidators";

const router = Router();

router.get("/:_id?", isAuthenticated, validateId, getUser);
router.put("/", isAuthenticated, validateObjectToUpdateUser, updateUser);

export default router;
