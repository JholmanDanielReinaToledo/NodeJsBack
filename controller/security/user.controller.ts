import { Request, Response } from "express";
import dataSource from "../../config/database";
import { User } from "../../model/security/user.entity";
import { genSaltSync, hashSync } from "bcrypt";
import { omit } from "lodash";

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

  public getUsers = async (req: Request, res: Response) => {
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

  public insertUser = async (req: Request, res: Response) => {
    try {
      const repository = dataSource.getRepository(User);

      const { password } = req.body;

      req.body.saltPassword = genSaltSync(saltRounds);
      req.body.password = hashSync(password, req.body.saltPassword);

      const newData = repository.create(req.body);
      await repository.save(newData);
      
      res.json(omit(newData, this.privateInfoUser));
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la User' });
    }
  };

}