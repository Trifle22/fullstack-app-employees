import { CustomRequest } from '@/customTypes/reqWithUser';
import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();

// get api/employees
// @access private
export const getAll = async (_req: CustomRequest, res: express.Response) => {
  try {
    const employees = await prisma.employee.findMany({
      where: {
        userId: _req.user?.id as string,
      }
    });

    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({message: 'He удалось получить сотрудников'})
  }
}
// post api/employees/add
// @access private
export const addEmployee = async (req: CustomRequest, res: express.Response) => {
  try {
    const {firstName, lastName, address, age} = req.body;

  if (!firstName || !lastName || !address || !age) {
    return res.status(400).json({ message: 'Заполните обязательные поля' })
  }

  const employee = await prisma.employee.create({
    data: {
      firstName,
      lastName,
      address,
      age,
      userId: req.user?.id as string
    }
  })

  return res.status(201).json(employee)

  } catch {
    res.status(500).json({ message: "Что-то пошло не так" })
  }
}

// api/employees/remove/:id
export const removeEmployee = async (req: express.Request, res: express.Response) => {

  try {
    const { id } = req.params

    await prisma.employee.delete({
      where: {
        id
      }
    })

    res.status(200).json({ message: "Сотрудник успешно удален"})

  } catch {
    return res.status(500).json({ message: "Не удалось удалить сотрудника" })
  }
}
// api/employees/edit/:id
export const editEmployee = async (req: express.Request, res: express.Response) => {

  try {
    await prisma.employee.update({
      where: {
        id: req.params.id
      },
      data: req.body
    })

    res.status(200).json({ message: "Сотрудник успешно отредактирован"})
  } catch {
    return res.status(500).json({ message: "Не удалось отредактировать сотрудника" })
  }
}

export const getByID = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({
      where: {
        id
      }
    })

    res.status(200).json(employee);
  } catch {
    return res.status(500).json({ message: "Не удалось получить сотрудника по ID" })
  }
}