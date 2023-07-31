import { Request, Response } from "express";
import Service from "../services/room";
export class RoomController {
  async getAvailable(req: Request, res: Response) {
    const response = await Service.getAvailable(
      Number(req.params?.hotelId)
    );
    return res
      .status(response.status)
      .json({ data: response.data, error: response.error });
  }
  async getAll(req: Request, res: Response) {
    // if (req.user?.admin) {
      const response = await Service.getAll();
      return res
        .status(response.status)
        .json({ data: response.data, error: response.error });
    // }
    return res.status(401).json({ data: null, error: "Não autorizado" });
  }
}
