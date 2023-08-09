import { FindManyOptions, Repository } from "typeorm";
import GenericModel from "./generic.model";
import { Request, Response } from "express";
import { omit } from "lodash";

class GenericController<T extends GenericModel> {
  private repository: Repository<T>;
  private nameEntity: string;

  private optionsSelect?: FindManyOptions<T>;
  private privateInfo?: (keyof T)[];

  constructor(
    {
      nameEntity,
      repository,
      optionsSelect,
      privateInfo,
    }: {
      repository: Repository<T>,
      nameEntity: string,
      optionsSelect?: FindManyOptions<T>,
      privateInfo?: (keyof T)[]
    }
  ) {
    this.repository = repository;
    this.optionsSelect = optionsSelect;
    this.nameEntity = nameEntity;
    this.privateInfo = privateInfo;
  }

  async create(req: Request, res: Response) {
    try {
      const newData = this.repository.create(req.body);
      await this.repository.save(newData);

      res.json(omit(newData, this.privateInfo));
    } catch (error) {
      res.status(500).json({ error: `Error al crear ${this.nameEntity}` });
    }
  }

  async getAll(req: Request, res: Response) {
    console.log(this.repository);
    try {
      const data = await this.repository.find();
      return res.json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error al obtener las Users' });
    }
  }

  async getById(id: number): Promise<T | null> {
    // @ts-ignore
    return await this.repository.findOneBy({ id });
  }

  async update(id: number, newItem: T): Promise<T | null> {
    // @ts-ignore
    const itemToUpdate = await this.repository.findOneBy({ id });

    if (!itemToUpdate) {
      return null;
    }

    this.repository.merge(itemToUpdate, newItem);
    return await this.repository.save(itemToUpdate);
  }

  async delete(id: number): Promise<boolean> {
    // @ts-ignore
    const itemToDelete = await this.repository.findOneBy({ id });

    if (!itemToDelete) {
      return false;
    }

    await this.repository.remove(itemToDelete);
    return true;
  }
}

export default GenericController;
