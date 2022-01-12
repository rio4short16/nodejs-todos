const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

// Middlewares
app.use(express.static('public'))
app.use("/public", express.static(path.join(__dirname, "public")))

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}));

// Template Engines
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const { fetchTodos, addNewTodo, updateTodo, changeStatusTodo, fetchTodoByID, deleteTodo } = require('./services/todoService')

// Routes
app.get('/', async (req, res) => {
    const todos = await fetchTodos('')
    res.render('index', { todos })
})

app.post('/tasks', async (req, res) => {
    const { task } = req.body
    const todos = await fetchTodos(task)
    if(!todos){
        return res.json({ result: false })
    }
    res.json({ result: true, todos })
})

app.post('/addtask', async (req, res) => {
    const { task } = req.body
    const addedTask = await addNewTodo(task)
    if(!addedTask){
        return res.json({ result: false, msg: 'Something went wrong!' })
    }
    res.json({result: true, msg: 'Task has been saved successfully!'})
})

app.post('/updatetask', async (req, res) => {
    const { taskID, task } = req.body
    const updatedTask = await updateTodo(taskID, task)
    if(!updatedTask){
        return res.json({ result: false, msg: 'Something went wrong!' })
    }
    res.json({result: true, msg: 'Task has been updated successfully!'})
})

app.post('/changestatus', async (req, res) => {
    const { taskID } = req.body
    const task = await fetchTodoByID(taskID)
    if(task == null || task == undefined){
        return res.json({ result: false, msg: 'Something went wrong!' })
    }
    let newstatus = 1;
    if(task.status == 1){
        newstatus = 0
    }
    const updatedStatus = await changeStatusTodo(taskID, newstatus)
    if(!updatedStatus){
        return res.json({ result: false, msg: 'Something went wrong!' })
    }
    res.json({result: true, msg: 'Status has been updated successfully!'})
})

app.post('/removetask', async (req, res) => {
    const { taskID } = req.body
    const deletedTask = await deleteTodo(taskID)
    if(!deletedTask){
        return res.json({ result: false, msg: 'Something went wrong!' })
    }
    res.json({result: true, msg: 'Task has been deleted successfully!'})
})

app.get('*', (req, res) => {
	res.redirect('/')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, function() {
	console.log(`Listening to port: ${PORT}`)
})