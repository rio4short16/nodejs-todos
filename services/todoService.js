const mysql = require('mysql')
const pool  = mysql.createPool({ password: '', user: 'root', database: 'todos', host: 'localhost', port: '3306' })
pool.getConnection((err) => {
	if(err) throw err;
	console.log(`Connection Established!`)
});
const fetchTodos = (search) => {
    return new Promise((resolve, reject) => {
		pool.query(` SELECT * FROM tbl_todos WHERE task LIKE "%"?"%"`, [search],
		(err, results) => {
			if(err){
				return reject(err)
			}
			return resolve(results)
		})
	})
}
const fetchTodoByID = (taskID) => {
    return new Promise((resolve, reject) => {
		pool.query(` SELECT * FROM tbl_todos WHERE id=?`, [taskID],
		(err, result) => {
			if(err){
				return reject(err)
			}
			return resolve(result[0])
		})
	})
}
const addNewTodo = (task) => {
    return new Promise((resolve, reject) => {
		pool.query(`INSERT INTO tbl_todos (task) VALUES (?)`, [task],
		(err) => {
			if(err){
				return reject(err)
			}
			return resolve(true)
		})
	})
}
const updateTodo = (taskID, task) => {
    return new Promise((resolve, reject) => {
		pool.query(`UPDATE tbl_todos SET task=? WHERE id=?`, [task, taskID],
		(err) => {
			if(err){
				return reject(err)
			}
			return resolve(true)
		})
	})
}
const changeStatusTodo = (taskID, newstatus) => {
    return new Promise((resolve, reject) => {
		pool.query(`UPDATE tbl_todos SET status=? WHERE id=?`, [newstatus, taskID],
		(err) => {
			if(err){
				return reject(err)
			}
			return resolve(true)
		})
	})
}
const deleteTodo = (taskID) => {
    return new Promise((resolve, reject) => {
		pool.query(`DELETE FROM tbl_todos WHERE id=?`, [taskID],
		(err) => {
			if(err){
				return reject(err)
			}
			return resolve(true)
		})
	})
}

module.exports = { fetchTodos, fetchTodoByID, addNewTodo, updateTodo, changeStatusTodo, deleteTodo }