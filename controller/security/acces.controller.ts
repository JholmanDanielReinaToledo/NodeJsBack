import { Request, Response } from "express";
import dataSource from "../../config/database";
import { User } from "../../model/security/user.entity";
import { isEmpty, isEqual } from "lodash";
import { hashSync } from "bcrypt";
import moment from "moment";
import { sign } from "jsonwebtoken";
import { TOKEN_SECRET } from "../../utils/constants";
import { isValidJwt } from "../../utils/functions/security";

export class AccesController {
  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log(req.body)
      return res.status(400).json({ error: 'No se envio el email o la contraseña'});
    }
    
    try {
      const repository = dataSource.getRepository(User);

      const user = await repository.findOneBy({
        email, 
      });

      if (isEmpty(user)) {
        return res.status(400).json({ error: 'Usuario no encontrado' })
      }

      const pass = hashSync(password, user.saltPassword)

      if (isEqual( pass, user.password)) {
        const date = moment().add(40, 'second').calendar();

        const token = sign({
          id: user.id,
          email: user.email,
          expirationDate: date,
        }, TOKEN_SECRET)

        return res.status(200).json({ token });
      }


      return  res.status(400).json({ error: 'La contraseña o el corre no son correctos' });
    } catch (error) {
      res.status(500).json({ error: '' })
    }
  }

  public validateSession = (req: Request, res: Response) => {
    const token = req.headers.authorization;

    if (isEmpty(token)) {
      return res.status(400).json({ error: 'No se encontró un JWT'});
    }

    if (isValidJwt(token)) {
      return res.status(200).send();
    }
    return res.status(401).send();
  }
}
