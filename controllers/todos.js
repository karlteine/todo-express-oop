import { fileManager } from '../utils/files.js'
import { Todo } from '../models/todo.js'

class todoController {
    constructor(){
        // try get data from file and init tasks array
        this.initTodos() 
    }
    async createTodo(req, res){
        // get data from POST request
        const task = req.body.task
        // create new object via Todo model
        // model constructor uses uniq id and task name as paramater
        const newTodo = new Todo(Math.random().toString(), task)
        // add new todo to todos array
        this.TODOS.push(newTodo)
        // save data to file
        await fileManager.writeFile('./data/todos.json', this.TODOS)
        // create a correct response
        res.json({
            message: 'created new todo object',
            newTask: newTodo
        })
    }
    
    async initTodos(){
        const todosData = await fileManager.readFile('./data/todos.json')
        // if data is ok - add file content to array
        if(todosData !== null){
            this.TODOS = todosData
        } else {
            this.TODOS = [] // if we do not get data from file create an empty   
        }  
    } 
    getTodos(req, res) {
        res.json({tasks: this.TODOS})
    } 
    updateTodo(req, res){
        // get id from url params
        const todoId = req.params.id
        // get the updated task name from request body (like from data)
        const updatedTask = req.body.task
        // get the array element if todo id is equal with url params id
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId)
        // if url params id is not correct - send error message
        if (todoIndex < 0) {
            throw new Error('Could not find todo!')
            res.json({
                message: 'Could not find todo with such index'
            })
        }
        // if id is ok - update Todo
        // for update create element with the same id and new task
        // and save it in the same array element by this index
        this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask)  
        // show updated info
        res.json({
            message: 'Updated todo',
            updatedTask: this.TODOS[todoIndex]  
        })
    }
    deleteTodo(req, res){
        // get id from url params
        const todoId = req.params.id;
        // find the index of the todo with the given id in the array
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId);
        
        // if the todo with the given id is not found, send an error message
        if (todoIndex < 0) {
            console.error('Could not find todo!');
            return res.status(404).json({
                message: 'Could not find todo with such index'
            });
        }
    
        // if the id is okay, remove the todo from the array
        const deletedTodo = this.TODOS.splice(todoIndex, 1)[0];
    
        // send a response with the deleted todo
        res.json({
            message: 'Deleted todo',
            deletedTodo: deletedTodo
        });
    }  
} 

export const TodoController = new todoController()