import { Router } from "express";
import TareaRouter from '../../routes/tarea.router';
import SecurityRouter from '../../routes/security/index.router';

const router = Router();

router.use('/tarea', TareaRouter);

// security
router.use('/security', SecurityRouter);

export default router;