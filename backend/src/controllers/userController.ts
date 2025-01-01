import { Request, Response } from 'express';
import User from '../models/userModel';

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, role, doctorNumber } = req.body;
    const user = await User.create({ name, email, role, doctorNumber });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Error creating user' });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Error fetching users' });
  }
};

export { createUser, getUsers };
