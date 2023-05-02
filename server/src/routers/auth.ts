import { Router } from "express";

import { registerUser, loginUser } from "../controllers/auth";
import {
  validatedObjectToRegisterUser,
  validatedObjectToLoginUser,
} from "../middlewares/validators/authValidators";

const router = Router();

router.post("/register", validatedObjectToRegisterUser, registerUser);
router.post("/login", validatedObjectToLoginUser, loginUser);

export default router;
