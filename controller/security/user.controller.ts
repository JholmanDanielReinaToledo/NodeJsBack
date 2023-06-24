import { Request, Response } from "express";
import dataSource from "../../config/database";
import { User } from "../../model/security/user.entity";
import { genSaltSync, hashSync } from "bcrypt";
import { isEmpty, omit } from "lodash";

const saltRounds = 10;
export class UserController {
  publicInfoUser = {
    id: true,
    avatar: true,
    email: true,
    name: true,
    createdAt: true,
  }

  privateInfoUser = ['saltPassword', 'password'];

  public obtenerUsers = async (req: Request, res: Response) => {
    try {
      const repository = dataSource.getRepository(User);
      const datos = await repository.find({
        select: this.publicInfoUser,
      });
      res.json(datos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las Users' });
    }
  };

  public crearUser = async (req: Request, res: Response) => {
    try {
      const repository = dataSource.getRepository(User);

      const { password } = req.body;

      req.body.saltPassword = genSaltSync(saltRounds);
      req.body.password = hashSync(password, req.body.saltPassword);

      const nuevoDato = repository.create(req.body);
      await repository.save(nuevoDato);
      
      res.json(omit(nuevoDato, this.privateInfoUser));
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la User' });
    }
  };

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'No se envio el email o la contraseña'});
    }
    
    try {
      const repository = dataSource.getRepository(User);

      const user = await repository.findBy({
        email, 
      });

      if (isEmpty(user)) {
        return res.status(400).json({ error: 'Usuario no encontrado' })
      }

      console.log(user);

      return  res.status(200).send();
    } catch (error) {
      res.status(500).json({ error: '' })
    }
  }
}