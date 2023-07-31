import { Router } from "express";
import { UserController } from '../controllers/user';
import { authenticate } from '../middlewares/auth';

const router = Router();
const controller = new UserController();

router.get('/', authenticate, controller.findAll)
router.get('/me', authenticate, controller.getMe)
router.get('/pets', authenticate, controller.getMyPets)
router.get('/address', authenticate, controller.getMyAddress)
router.get('/iscomplete', authenticate, controller.isSignupComplete)
router.get('/:id', authenticate, controller.findById)
router.post('/login', controller.login)
router.post('/', controller.create)
router.put('/:id', authenticate, controller.update)
router.delete('/:id', authenticate, controller.delete)

export default router;