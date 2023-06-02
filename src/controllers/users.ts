import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '@/customTypes/reqWithUser';

const prisma = new PrismaClient();

// @route POST api/user/login
export const login = async (_req: express.Request, res: express.Response) =>{
  try {
    const {email, password} = _req.body;
    if (!email || !password) {
      return res.status(400).json({message: "Пожалуйста, укажите email и пароль"})
    }
  
    const user = await prisma.user.findFirst({where: {
      email
    }});
  
    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password))
    const secret = process.env.JWT_SECRET;
  
    if (isPasswordCorrect && user && secret) {
      return res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({id: user.id}, secret, { expiresIn: '30d' })
    })
    }
  
    return res.status(404).json({message: "Неверно введен логин или пароль"})
  } catch {
    res.status(500).json({message: "Что-то пошло не так"});
  }
}

// @route POST api/user/register
export const register = async (_req: express.Request, res: express.Response) => {

  try {
    const { email, password, name } = _req.body;

    if (!email || !password || !name) {
      return res.status(400).json({message: "Пожалуйста, заполните обязательные поля"})
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
      email
    }
    });

    if (registeredUser) {
      return res.status(400).json({message: "Пользователь c таким email уже существует"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    })

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      console.log('user && secret');

      return res.status(201).json({
        id: user.id,
        email: user.email,
        name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
      })
    }

    return res.status(400).json({ message: "Не удалось создать пользователя" })
  } catch (err) {
      res.status(500).json({ message: 'Что-то пошло не так'})
  }
}

// @route POST api/user/current
export const current = async (_req: CustomRequest, res: express.Response) => {
  return res.status(200).json(_req.user)
};
