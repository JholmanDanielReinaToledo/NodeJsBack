import dataSource from "../../config/database";
import GenericController from "../../generics/generic.controller";
import { User } from "./user.entity";

export class UserController2 extends GenericController<User> {
  constructor() {
    const repository = dataSource.getRepository(User);
    console.log(repository);
    super({
      nameEntity: 'Usuario',
      repository,
      privateInfo: ["password", "saltPassword"],
    });
  }
}