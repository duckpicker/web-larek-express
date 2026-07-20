import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import { BadRequestError } from '../errors/errors';

const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      total,
      items,
    } = req.body;

    const products = await Product.find({ _id: { $in: items } });
    if (products.length !== items.length) {
      next(new BadRequestError('Some products were not found'));
      return;
    }

    const calculatedTotal = products.reduce((sum, product) => {
      if (product.price === null) {
        next(new BadRequestError(`Product "${product.title}" is not for sale`));
        return sum;
      }
      return sum + product.price;
    }, 0);

    if (calculatedTotal !== total) {
      next(new BadRequestError('Total amount does not match'));
      return;
    }

    const orderId = crypto.randomUUID();

    res.json({ id: orderId, total });
  } catch (err) {
    next(err);
  }
};

export default createOrder;
