import { Request, Response } from 'express';
import { Task } from '../model/task.entity';
import dataSource from '../config/database';

export class TaskController {
  public getTasks = async (req: Request, res: Response) => {
    try {
      const repository = dataSource.getRepository(Task);
      const data = await repository.find({
        relations: {
            user: true,
        },
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las tareas' });
    }
  };

  public insertTask = async (req: Request, res: Response) => {
    try {
      const repository = dataSource.getRepository(Task);
      const newData = repository.create(req.body);
      await repository.save(newData);
  
      res.json(newData);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la tarea' });
    }
  };
}
