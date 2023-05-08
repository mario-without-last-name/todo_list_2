import React, { Fragment, useEffect, useState } from "react";

const EditTodo = ({todo}) => {
    // console.log(todo);

    const [description ,    setDescription   ] = useState(todo.description);
    const [name,            setName          ] = useState(todo.name); //Cannot be combined alltogether into 1 line. Must be seperated for each variable
    const [age,             setAge           ] = useState(todo.age);
    const [gender,          setGender        ] = useState(todo.gender);
    const [dateOfBirth,     setDateOfBirth   ] = useState(todo.dateOfBirth);
    const [gpa,             setGpa           ] = useState(todo.gpa);
    const [isWorking,       setIsWorking     ] = useState(todo.isWorking);
    const [interests,       setInterests     ] = useState(todo.interests);
    const [profilePicture,  setProfilePicture] = useState(todo.profilePicture);

    //edit description function

    const updateTodo = async e => {
        e.preventDefault();
        try {
            //const body = { description };
            const body = { name:name, age:age, gender:gender, dateOfBirth:dateOfBirth, gpa:gpa, isWorking:isWorking, interests:interests, profilePicture:profilePicture };
            if(name == ""){
                alert(`"Name" field cannot be empty`);
            }else if(age == ""){
                alert(`"Age" field cannot be empty`);
            }else if(gender == ""){
                alert(`"Gender" field cannot be empty`);
            }else if(dateOfBirth == ""){
                alert(`"Date Of Birth" field cannot be empty`);
            }else if(gpa == ""){
                alert(`"GPA" field cannot be empty`);
            }else if(isWorking == ""){
                alert(`"Working Status" field cannot be empty`);
            // }else if(interests == ""){
            //     alert(`"Interests" field cannot be empty`);
            }else if(profilePicture == ""){
                alert(`"Profile Picture" field cannot be empty`);
            }else{
                const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                    method: "PUT", headers: { "Content-Type" : "application/json" }, body: JSON.stringify(body)
                });
                window.location = "/";
            }
            //console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    }

    const getAgeOptions = () => {
        const options = [];
        options.push(<option value=""></option>);
        for (let i = 8; i <= 100; i++) {
        options.push(<option value={i}>{i}</option>);
        }
        return options;
    };

    const changeInterests = (e) => {
        const { value } = e.target;
        console.log(value);
        console.log(interests);
        if (interests.includes(value)) {
            setInterests(interests.filter((i) => i !== value));
        } else {
            setInterests([...interests, value]);
        }
    };

    return (
        <Fragment>
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}> {/* "#"" means you are targetting something */}
                Edit
            </button>
            <div class="modal fade" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Todo</h4>
                            <button type="button" class="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>&times;</button> {/* The "x" button */}
                        </div>
                        <div class="modal-body">
                            {/* <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/> */}
                            <div className="d-flex justify-content-center">
                                <table>
                                    <tr>
                                        <td><h4 className="text-right mr-2">Name:</h4></td>
                                        <td>
                                            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="text-right mr-2">Age:</h4></td>
                                        <td>
                                            <select className="form-control" value={age} onChange={e => setAge(e.target.value)}>
                                                {getAgeOptions()}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="text-right mr-2">Gender:</h4></td>
                                        <td>
                                            <div className="d-flex justify-content-left">
                                                <input type="radio" name="gender" value="male"   onChange={e => {setGender(e.target.value); console.log(e)}}/> {/* to print whatever is sent to the console, it returns a massive list, like file directories, where you must enter like folders */}
                                                <h6 className="ml-1 mr-3 mt-1">Male</h6>
                                                <input type="radio" name="gender" value="female" onChange={e => {setGender(e.target.value); console.log(e.target.value)}}/> {/* Automatically just know what value is given, without manually looking into "folders" of the conolse output */}
                                                <h6 className="ml-1 mr-3 mt-1">Female</h6>
                                                <input type="radio" name="gender" value="unkown" onChange={e => setGender(e.target.value)}/>
                                                <h6 className="ml-1 mr-3 mt-1">Unknown</h6>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="text-right mr-2">Date Of Birth:</h4></td>
                                        <td><input type="date" id="dob" name="dob"  onChange={e => setDateOfBirth(e.target.value)}/></td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="text-right mr-2">GPA:</h4></td>
                                        <td>
                                            <td>
                                                <input type="number" className="form-control" min="0" max="4" step="0.1" value={gpa} onChange={e => setGpa(e.target.value)}/>
                                            </td>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="text-right mr-2">Working Status:</h4></td>
                                        <td>
                                            <div className="d-flex justify-content-left">
                                                <input type="radio" name="isWorking" value={"true"}  checked={isWorking==="true"} onChange={e => {setIsWorking(e.target.value); console.log(e.target.value)}}/>
                                                <h6 className="ml-1 mr-3 mt-1">Employed</h6> 
                                                <input type="radio" name="isWorking" value={"false"} checked={isWorking==="false"} onChange={e => {setIsWorking(e.target.value); console.log(e.target.value)}}/>
                                                <h6 className="ml-1 mr-3 mt-1">Unemployed</h6>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="text-right mr-2">Interests:</h4></td>
                                        <td>
                                            <div className="d-flex justify-content-left">
                                                <input type="checkbox" name="interests" value="games"   checked={interests?.includes("games")}   onChange={changeInterests} />
                                                <h6 className="ml-1 mr-3 mt-1">Games</h6>
                                                <input type="checkbox" name="interests" value="sports"  checked={interests?.includes("sports")}  onChange={changeInterests} />
                                                <h6 className="ml-1 mr-3 mt-1">Sports</h6>
                                                <input type="checkbox" name="interests" value="reading" checked={interests?.includes("reading")} onChange={changeInterests} />
                                                <h6 className="ml-1 mr-3 mt-1">Reading</h6>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="text-right mr-2">Profile Picture:</h4></td>
                                        <td>
                                            <input type="file" name="profilePicture" accept="image/*" onChange={e => {setProfilePicture(e.target.value); console.log(e)}}/>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning" data-dismiss="modal" onClick= {e => updateTodo(e)}>Edit</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditTodo;