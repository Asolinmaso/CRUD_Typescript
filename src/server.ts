import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { User } from './models/user';
const app = express();
app.use(bodyParser.json());
import dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.mongodb_uri|| '', {

})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.post('/users', async (req: Request, res: Response) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save()
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// UPDATE a user by ID
app.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// DELETE a user by ID
app.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
