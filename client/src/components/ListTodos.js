import React, { Fragment, useEffect, useState } from "react";
import Pagination from "react-js-pagination";

import EditTodo from "./EditTodo";

const ListTodos = () => {
    const [todos, setTodos] = useState([]);
    const [name, setName] = useState("Todo");
    const [title, setTitle] = useState("");
    const [listcount, setListcount] = useState(0);

    //delete todo function

    const deleteTodo = async id => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {method: "DELETE"});
            //console.log(deleteTodo);
            setTodos(todos.filter(todo => todo.todo_id != id));
            setName("Todo (Deleted)");
            window.location = "/";
        } catch (err) {
            console.log(err.message);
        }
    }

    const getTodos = async() => {
        try {
            const response = await fetch("http://localhost:5000/todos")
            const jsonData = await response.json();
            // setTodos(jsonData);
            // setListcount(jsonData.length);
            //console.log(jsonData);

            let newJsonData = [];
            jsonData.map((data, index) => {
                let interests_combinaton = [];
                if(data?.interests){
                    if(JSON.stringify(data?.interests).includes("games")){
                        interests_combinaton.push("games");
                    }
                    if(JSON.stringify(data?.interests).includes("sports")){
                        interests_combinaton.push("sports");
                    }
                    if(JSON.stringify(data?.interests).includes("reading")){
                        interests_combinaton.push("reading");
                    }
                }
                newJsonData.push({
                    ...data, interests:interests_combinaton
                });
            });
            setTodos(newJsonData);
            setListcount(newJsonData.length);
            console.log(newJsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    let list_number = 0;  //Cannot use "const", since it means that the variable's value can never change
    const getListNumber = () => {
        list_number++;
        return <b>{list_number}</b>;
    };

    useEffect(() => {
        if (name === "Todo (Deleted)") {
            setTitle("Changed");
        }
    }, [name]);

    useEffect(() => { 
        getTodos();
    }, []);

    console.log(todos);
    return (
        <Fragment>
            <div class="ml-5 mr-5 mt-5">
                <h1>List {name}</h1>
                <p>{title}</p>
                <p>There are currently {listcount} lists</p>
                <table class="table text-center">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Date Of Birth</th>
                            <th>GPA</th>
                            <th>Working Status</th>
                            <th>Interests</th>
                            <th>Profile Picture</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(todo =>(
                            <tr>
                                <td>{getListNumber()}</td>
                                <td>{todo.todo_id}</td>
                                <td>{todo.name}</td>
                                <td>{todo.age}</td>
                                <td>{todo.gender}</td>
                                {/* <td>{todo.date_of_birth}</td> */}
                                <td>{new Date(todo.date_of_birth).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}</td>
                                <td>{todo.gpa}</td>
                                {/* <td>{todo.is_working}</td> */} {/* Nothing is outputed here */}
                                <td>{todo.is_working.toString()}</td>
                                <td>{todo.interests}</td>
                                <td>{todo.profile_picture}</td>
                                <td>
                                    <EditTodo todo={todo}/>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> 
        </Fragment>
    );
};

export default ListTodos;