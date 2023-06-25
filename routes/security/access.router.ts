import { Router } from "express";
import { AccesController } from "../../controller/security/acces.controller";

const { login, validateSession } = new AccesController();

const router = Router()

router.post('/login', login);
router.post('/validate', validateSession);

export default router;
