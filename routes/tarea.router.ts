import { Router } from "express";
import { TareaController } from "../controller/tarea.controller";

const router = Router();

const {crearTarea, obtenerTareas} = new TareaController();

router.get('/', obtenerTareas);
router.post('/', crearTarea);

export default router;
