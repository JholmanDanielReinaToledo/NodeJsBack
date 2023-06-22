import { Request, Response } from "express";
import dataSource from "../../config/database";
import { User } from "../../model/security/user.entity";

export class UserController {
  public obtenerUsers = async (req: Request, res: Response) => {
    try {
      const repository = dataSource.getRepository(User);
      const datos = await repository.find();
      res.json(datos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las Users' });
    }
  };

  public crearUser = async (req: Request, res: Response) => {
    try {
      const repository = dataSource.getRepository(User);
      const nuevoDato = repository.create(req.body);
      await repository.save(nuevoDato);
  
      res.json(nuevoDato);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la User' });
    }
  };
}