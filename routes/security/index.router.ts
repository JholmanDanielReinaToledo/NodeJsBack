import { Router } from "express";
import UserRouter from '../../routes/security/user.router';
import AccessRouter from '../security/access.router'

const router = Router()

router.use('/user', UserRouter);
router.use('/access', AccessRouter);

export default router;