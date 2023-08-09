import { Router } from "express";
import TaskRouter from '../../routes/task.router';
import SecurityRouter from '../../routes/security/index.router';

const router = Router();

router.use('/task', TaskRouter);

// security
router.use('/security', SecurityRouter);

export default router;