import { Request, Response } from "express";
import Pet from "../services/pet";
export class PetController {
  async findById(req: Request, res: Response) {
    const response = await Pet.findById(Number(req.params.id));
    if (req.user?.admin || response.data?.user.id == req.user?.id) {
      return res
        .status(response.status)
        .json({ data: response.data, error: response.error });
    }
    return res.status(401).json({ data: null, error: "Não autorizado" });
  }
  async findAll(req: Request, res: Response) {
    if (req.user?.admin) {
      const response = await Pet.findAll();
      return res
        .status(response.status)
        .json({ data: response.data, error: response.error });
    }
    return res.status(401).json({ data: null, error: "Não autorizado" });
  }
  async create(req: Request, res: Response) {
    const response = await Pet.createPet({ ...req.body, userId: req.user?.id });
    return res
      .status(response.status)
      .json({ data: response.data, error: response.error });
  }
  async update(req: Request, res: Response) {
    const response = await Pet.updatePet(Number(req.params.id), req.body, req.user?.id);
    return res
      .status(response.status)
      .json({ data: response.data, error: response.error });
  }
  async delete(req: Request, res: Response) {
    const response = await Pet.deletePet(Number(req.params.id), req.user?.id);
    return res
      .status(response.status)
      .json({ data: response.data, error: response.error });
  }
}
