import { Router } from "express";
import { UserController } from "../../controller/security/user.controller"; 

const { insertUser, getUsers } = new UserController();

const router = Router();

router.get('/', getUsers);
router.post('/', insertUser);

export default router;
