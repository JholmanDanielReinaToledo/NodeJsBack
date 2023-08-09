import { Router } from "express";
import { UserController } from "../../controller/security/user.controller"; 
import { UserController2 } from "../../model/security/user2.entity";

const { insertUser, getUsers } = new UserController();
const { getAll } = new UserController2();

const router = Router();

router.get('/', getUsers);
router.post('/', insertUser);

router.get('/2', getAll);

export default router;
