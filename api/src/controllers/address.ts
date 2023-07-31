import { Request, Response } from "express";
import Address from "../services/address";
export class AddressController {
    async findById(req: Request, res: Response) {
      const response = await Address.findById(Number(req.params.id));
      if (req.user?.admin || response.data?.user.id == req.user?.id) {
        return res
          .status(response.status)
          .json({ data: response.data, error: response.error });
      }
      return res.status(401).json({ data: null, error: "Não autorizado" });
    }
    async findAll(req: Request, res: Response) {
      if (req.user?.admin) {
        const response = await Address.findAll();
        return res
          .status(response.status)
          .json({ data: response.data, error: response.error });
      }
      return res.status(401).json({ data: null, error: "Não autorizado" });
    }
    async create(req: Request, res: Response) {
      const response = await Address.createAddress({ ...req.body, userId: req.user?.id });
      return res
        .status(response.status)
        .json({ data: response.data, error: response.error });
    }
    async update(req: Request, res: Response) {
      const response = await Address.updateAddress(Number(req.params.id), req.body, req.user?.id);
      return res
        .status(response.status)
        .json({ data: response.data, error: response.error });
    }
  }