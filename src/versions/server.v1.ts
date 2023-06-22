import { Router } from "express";
import TareaRouter from '../../routes/tarea.router';
import UserRouter from '../../routes/security/user.router';

const router = Router();

router.use('/tarea', TareaRouter);

// security
router.use('/security/user', UserRouter);

export default router;