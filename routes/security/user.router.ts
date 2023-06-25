import { Router } from "express";
import { UserController } from "../../controller/security/user.controller"; 

const { crearUser , obtenerUsers } = new UserController();

const router = Router();

router.get('/', obtenerUsers);
router.post('/', crearUser);

export default router;
