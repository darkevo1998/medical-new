import { Request, Response } from 'express';
import Task from '../models/taskModel';
import User from '../models/userModel';

const createTask = async (req: Request, res: Response) => {
  try {
    // Destructure the fields from the request body
    const { description, deadline, assignedTo } = req.body;

    // Create the task with the provided data
    const task = await Task.create({
      description,
      deadline,
      assignedTo, // This is an array of user IDs
    });

    // Return the created task in the response
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Error creating task' });
  }
};

const getTasks = async (req: Request, res: Response) => {
  try {
    // Fetch all tasks from the database
    const tasks = await Task.findAll();

    // Fetch user data for each task's assignedTo
    const tasksWithUserNames = await Promise.all(
      tasks.map(async (task) => {
        // Fetch user names for the assigned user IDs
        const users = await User.findAll({
          where: {
            id: task.assignedTo, // Assuming task.assignedTo is an array of user IDs
          },
        });

        // Extract the names of the users
        const assignedUserNames = users.map((user) => user.name);

        // Return the task with assigned user names
        return { ...task.toJSON(), assignedTo: assignedUserNames };
      })
    );

    // Return the tasks with user names in the response
    res.status(200).json(tasksWithUserNames);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error fetching tasks' });
  }
};

export { createTask, getTasks };
