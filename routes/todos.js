import express from 'express';
import { TodoController } from '../controllers/todos.js';

// Use express.Router() instead of Routes
const router = express.Router();

router.post('/new-todo', (req, res) => TodoController.createTodo(req, res));

export default router;
