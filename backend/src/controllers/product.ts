import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import { BadRequestError, ConflictError } from '../errors/errors';
import HttpStatus from '../types/http-status';

export const getProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const products = await Product.find();
    res.json({ items: products, total: products.length });
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      title,
      image,
      category,
      description,
      price,
    } = req.body;

    const product = new Product({
      title,
      image,
      category,
      description,
      price,
    });

    await product.save();
    res.status(HttpStatus.CREATED).json(product);
  } catch (err) {
    if (err instanceof Error && err.message.includes('E11000')) {
      next(new ConflictError('Товар с таким title уже существует'));
      return;
    }
    if (err instanceof Error && err.name === 'ValidationError') {
      next(new BadRequestError('Ошибка валидации данных при создании товара'));
      return;
    }
    next(err);
  }
};
