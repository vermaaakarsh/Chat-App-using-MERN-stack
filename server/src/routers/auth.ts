import { Router } from "express";

import { registerUser } from "../controllers/auth";
import { validatedObjectToRegisterUser } from "../middlewares/validators/authValidators";

const router = Router();

router.post("/register", validatedObjectToRegisterUser, registerUser);

export default router;
