import express, { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '@/customTypes/reqWithUser';

const prisma = new PrismaClient();


export const auth = async (req: CustomRequest, res: express.Response, next: () => void) => {
  try {
    let token = req.headers.authorization?.split(' ')[1] || '';

    if (!token) throw  new Error;

    const secret = process.env.JWT_SECRET;

    if (secret) {
      const decoded = await jwt.verify(token, secret) as JwtPayload;

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        }
      })

      req.user = user || {};

      return next();
    }
  } catch (err) {
    res.status(401).json({message: 'Не авторизован'})
  }

}