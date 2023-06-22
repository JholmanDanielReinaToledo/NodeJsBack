import { Request, Response } from 'express';
import { Tarea } from '../model/tarea.entity';
import dataSource from '../config/database';

export class TareaController {
  public obtenerTareas = async (req: Request, res: Response) => {
    try {
      const repository = dataSource.getRepository(Tarea);
      const datos = await repository.find();
      res.json(datos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las tareas' });
    }
  };

  public crearTarea = async (req: Request, res: Response) => {
    try {
      console.log(req.body)

      const repository = dataSource.getRepository(Tarea);
      const nuevoDato = repository.create(req.body);
      await repository.save(nuevoDato);
  
      res.json(nuevoDato);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la tarea' });
    }
  };
}
