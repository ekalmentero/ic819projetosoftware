import { Router } from "express";
import { ServiceController } from '../controllers/service';
import { authenticate } from '../middlewares/auth';

const router = Router();
const controller = new ServiceController();

router.get('/', authenticate, controller.getClientServices)
router.post('/', authenticate, controller.schedule)
router.get('/all', authenticate, controller.getAll)
router.post('/finish/:id', authenticate, controller.finishService)
router.post('/confirm/:id', authenticate, controller.confirmCheckIn)

export default router;