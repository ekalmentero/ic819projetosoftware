import { Router } from "express";
import { authenticate } from "../middlewares/auth";
import { RoomController } from "../controllers/room";

const router = Router();
const controller = new RoomController();

router.get("/current", authenticate, controller.getAll);
router.get("/:hotelId", authenticate, controller.getAvailable);

export default router;
