import { Router } from "express";
import { TaskController } from "../controller/task.controller";

const router = Router();

const { insertTask, getTasks } = new TaskController();

router.get('/', getTasks);
router.post('/', insertTask);

export default router;
