import { Router } from "express";
import { UserController } from "../../controller/security/user.controller"; 

const { crearUser , obtenerUsers, login } = new UserController();

const router = Router();

router.get('/', obtenerUsers);
router.post('/', crearUser);
router.post('/login', login);

export default router;
