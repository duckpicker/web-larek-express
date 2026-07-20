import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/product';
import { validateCreateProduct } from '../validators';

const router = Router();

router.get('/', getProducts);
router.post('/', validateCreateProduct, createProduct);

export default router;
