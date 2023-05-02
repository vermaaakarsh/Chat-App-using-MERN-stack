import { Router } from "express";

import { isAuthenticated } from "../middlewares/isAuthentiacated";
import { getUser } from "../controllers/user";
import { validateId } from "../middlewares/validators/userValidators";

const router = Router();

router.get("/:_id?", isAuthenticated, validateId, getUser);

export default router;
