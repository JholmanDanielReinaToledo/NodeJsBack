import { PrimaryGeneratedColumn } from "typeorm";

class GenericModel {
  @PrimaryGeneratedColumn()
  id: number;
};

export default GenericModel;