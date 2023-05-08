const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//TABLE STRUCTURE//
/*
todo_id         // integer (auto-increment primary key)
name            // string
age             // integer (dropdown list, 8-100)
gender          // radio buttons ("male", "female", or "unknown")
date_of_birth   // date
gpa             // 1 decimal point (0.0 - 4.0)
is_working      // boolean
interests       // checkboxes ("games", "sports", "reading")
profile_picture // image file (stores the relative file path in the "images" folder)
*/

//ROUTES//

//create a todo
app.post("/todos", async(req, res) => {
    try {
        console.log(req.body);
        const { name, age, gender, date_of_birth, gpa, is_working, interests, profile_picture } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (name, age, gender, date_of_birth, gpa, is_working, interests, profile_picture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [name, age, gender, date_of_birth, gpa, is_working, interests, profile_picture]
        );
        res.json(newTodo);
    } catch (err) {
        console.error(err.message);
    } 
});
/* POSTMAN     method: POST     http://localhost:5000/todos
{
    "name": "Mickey Mouse",
    "age": 14,
    "gender": "male",
    "date_of_birth" : "2000-03-19",
    "gpa" : 4.0,
    "is_working": true,
    "interests": "games, reading",
    "profile_picture": "images/mickey.jpg"
}
*/

//get all todos
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo ORDER BY todo_id");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})
/* POSTMAN     method: GET     http://localhost:5000/todos */

//get a todo
app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
/* POSTMAN     method: GET     http://localhost:5000/todos/1     //Change the 1 with the row id you want*/

//update a todo
app.put("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const { age } = req.body;
        const { gender } = req.body;
        const { date_of_birth } = req.body;
        const { gpa } = req.body;
        const { is_working } = req.body;
        const { interests } = req.body;
        const { profile_picture } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET name = $1, age = $2, gender = $3, date_of_birth = $4, gpa = $5, is_working = $6, interests = $7, profile_picture = $8 WHERE todo_id = $9",
            [name, age, gender, date_of_birth, gpa, is_working, interests, profile_picture, id]
        );
        res.json("Todo was updated!");          
    } catch (err) {
        console.error(err.message);
    }
})
/* POSTMAN     method: PUT     http://localhost:5000/todos/1     //Change the 1 with the row id you want
{
    "name": "John - edited1",
    "age": 26,
    "gender": "unknown",
    "date_of_birth" : "1999-02-20",
    "gpa" : 1.0,
    "is_working": false,
    "interests": "games, sports",
    "profile_picture": "images/john.jpg"
}
*/

//delete a todo
app.delete("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleted!");
    } catch (err) {
        console.error(err.message);
    }
})
/* POSTMAN     method: DELETE     http://localhost:5000/todos/1     //Change the 1 with the row id you want*/



const port = 5000;
app.listen(port, () => {
    console.log(`server has started on port ${port}`);
})