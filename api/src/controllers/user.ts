import { Request, Response } from "express";
import UserService from "../services/user";
export class UserController {
  async getMe(req: Request, res: Response) {
    const response = await UserService.getMe(Number(req.user?.id));
    return res
      .status(response.status)
      .json({ data: response.data, error: response.error });
  }
  async getMyPets(req: Request, res: Response) {
    const response = await UserService.getMyPets(Number(req.user?.id));
    return res
      .status(response.status)
      .json({ data: response.data, error: response.error });
  }
  async getMyAddress(req: Request, res: Response) {
    const response = await UserService.getMyAddress(Number(req.user?.id));
    return res
      .status(response.status)
      .json({ data: response.data, error: response.error });
  }
  async isSignupComplete(req: Request, res: Response) {
    const response = await UserService.isSignupComplete(Number(req.user?.id));
    return res
      .status(response.status)
      .json({ data: response.data, error: response.error });
  }
  async findById(req: Request, res: Response) {
    if (req.user?.admin) {
      const response = await UserService.findById(Number(req.params.id));
      return res
        .status(response.status)
        .json({ data: response.data, error: response.error });
    }
    return res.status(401).json({ data: null, error: "Não autorizado" });
  }
  async findAll(req: Request, res: Response) {
    if (req.user?.admin) {
      const response = await UserService.findAll();
      return res
        .status(response.status)
        .json({ data: response.data, error: response.error });
    }
    return res.status(401).json({ data: null, error: "Não autorizado" });
  }
  async create(req: Request, res: Response) {
    const response = await UserService.createUser(req.body);

    return res
      .status(response.status)
      .json({ data: response.data, error: response.error });
  }
  async update(req: Request, res: Response) {
    const response = await UserService.updateUser(Number(req.params.id), req.body, req.user?.id, req.user?.admin);
    return res
      .status(response.status)
      .json({ data: response.data, error: response.error });
  }
  async delete(req: Request, res: Response) {
    const response = await UserService.deleteUser(Number(req.params.id), req.user?.id, req.user?.admin);
    return res
      .status(response.status)
      .json({ data: response.data, error: response.error });
  }
  async login(req: Request, res: Response) {
    const response = await UserService.login(req.body);
    return res
      .status(response.status)
      .json({ data: response.data, error: response.error });
  }
}
