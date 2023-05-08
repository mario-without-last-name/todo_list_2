import React, { Fragment, useState } from "react";

const InputTodo = () => {
    const [name,            setName          ] = useState(""); //Cannot be combined alltogether into 1 line. Must be seperated for each variable
    const [age,             setAge           ] = useState("");
    const [gender,          setGender        ] = useState("");
    const [date_of_birth,   setDateOfBirth   ] = useState("");
    const [gpa,             setGpa           ] = useState("");
    const [is_working,      setIsWorking     ] = useState("");
    const [interests,       setInterests     ] = useState("");
    const [profile_picture, setProfilePicture] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault()
        try {
            const body = { name:name, age:age, gender:gender, date_of_birth:date_of_birth, gpa:gpa, is_working:is_working, interests:interests, profile_picture:profile_picture }; //{property:variable}
            // const body_name            = { name };
            // const body_age             = { age };
            // const body_gender          = { gender };
            // const body_date_of_birth   = { date_of_birth };
            // const body_gpa             = { gpa };
            // const body_is_working      = { is_working };
            // const body_interests       = { interests };
            // const body_profile_picture = { profile_picture };
            if(name == ""){
                alert(`"Name" field cannot be empty`);
            }else if(age == ""){
                alert(`"Age" field cannot be empty`);
            }else if(gender == ""){
                alert(`"Gender" field cannot be empty`);
            }else if(date_of_birth == ""){
                alert(`"Date Of Birth" field cannot be empty`);
            }else if(gpa == ""){
                alert(`"GPA" field cannot be empty`);
            }else if(is_working == ""){
                alert(`"Working Status" field cannot be empty`);
            // }else if(interests == ""){
            //     alert(`"Interests" field cannot be empty`);
            }else if(profile_picture == ""){
                alert(`"Profile Picture" field cannot be empty`);
            }else{
                const response = await fetch("http://localhost:5000/todos", {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)});
                window.location = "/";
            }
        } catch (err) {
            console.error(err.message)
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

    /*
    let interest_games = false;
    let interest_sports = false;
    let interest_reading = false;
    const changeInterests = (interest) => {
        let interest_combination = "";
        if (interest == "games"){
            //interest_games ? interest_games = false : interest_games = true;
            if(interest_games){
                interest_games = false;
                console.log("games deselected");
            }else{
                interest_games = true;
                console.log("games selected");
            }
        }else if (interest == "sports"){
            //interest_sports ? interest_sports = false : interest_sports = true;
            if(interest_sports){
                interest_sports = false;
                console.log("sports deselected");
            }else{
                interest_sports = true;
                console.log("sports selected");
            }
        }else if (interest == "reading"){
            //interest_reading ? interest_reading = false : interest_reading = true;
            if(interest_reading){
                interest_reading = false;
                console.log("reading deselected");
            }else{
                interest_reading = true;
                console.log("reading selected");
            }
        }
        if(interest_games){
            interest_combination += "games";
        }
        if(interest_sports){
            if(interest_games){
                interest_combination += ", "
            }
            interest_combination += "sports";
        }
        if(interest_reading){
            if(interest_games || interest_sports){
                interest_combination += ", "
            }
            interest_combination += "reading";
        }
        return interest_combination;
    }
    */

    const changeInterests = (e) => {
        const { value } = e.target;
        console.log(interests);
        if (interests.includes(value)) {
            setInterests(interests.filter((i) => i !== value));
        } else {
            setInterests([...interests, value]);
        }
    };
    //const interestsString = interests.join(', ');

    return (
        <Fragment>
            <h1 className="text-center mt-5">Pern Todo List v2</h1>
            <form className="mt-5 ml-5 mr-5" onSubmit={onSubmitForm}>
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
                            <td><input type="date" id="dob" name="dob" onChange={e => setDateOfBirth(e.target.value)}/></td>
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
                                    <input type="radio" name="is_working" value="true"  onChange={e => setIsWorking(e.target.value)}/>
                                    <h6 className="ml-1 mr-3 mt-1">Employed</h6> 
                                    <input type="radio" name="is_working" value="false" onChange={e => setIsWorking(e.target.value)}/>
                                    <h6 className="ml-1 mr-3 mt-1">Unemployed</h6>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><h4 className="text-right mr-2">Interests:</h4></td>
                            <td>
                                <div className="d-flex justify-content-left">
                                    {/*
                                    <input type="checkbox" name="interests" value="games"   onChange={e => {setInterests(e.target.value); console.log(e.target.value)}}/>
                                    <h6 className="ml-1 mr-3 mt-1">Games</h6>
                                    <input type="checkbox" name="interests" value="sports"  onChange={e => {setInterests(e.target.value); console.log(e.target.value)}}/>
                                    <h6 className="ml-1 mr-3 mt-1">Sports</h6>
                                    <input type="checkbox" name="interests" value="reading" onChange={e => {setInterests(e.target.value); console.log(e.target.value)}}/>
                                    <h6 className="ml-1 mr-3 mt-1">Reading</h6> */}
                                    {/*
                                    <input type="checkbox" name="interests" value={changeInterests("games")}   onChange={e => {setInterests(e.target.value); console.log(e.target.value)}}/>
                                    <h6 className="ml-1 mr-3 mt-1">Games</h6>
                                    <input type="checkbox" name="interests" value={changeInterests("sports")}  onChange={e => {setInterests(e.target.value); console.log(e.target.value)}}/>
                                    <h6 className="ml-1 mr-3 mt-1">Sports</h6>
                                    <input type="checkbox" name="interests" value={changeInterests("reading")} onChange={e => {setInterests(e.target.value); console.log(e.target.value)}}/>
                                    <h6 className="ml-1 mr-3 mt-1">Reading</h6> */}

                                    <input type="checkbox" name="interests" value="games"   onChange={changeInterests} />
                                    <h6 className="ml-1 mr-3 mt-1">Games</h6>
                                    <input type="checkbox" name="interests" value="sports"  onChange={changeInterests} />
                                    <h6 className="ml-1 mr-3 mt-1">Sports</h6>
                                    <input type="checkbox" name="interests" value="reading" onChange={changeInterests} />
                                    <h6 className="ml-1 mr-3 mt-1">Reading</h6>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><h4 className="text-right mr-2">Profile Picture:</h4></td>
                            <td>
                                <input type="file" name="profile_picture" accept="image/*" onChange={e => {setProfilePicture(e.target.value); console.log(e)}}/>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-success btn-block ml-5 mr-5 mt-3">Add</button>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </form>
        </Fragment>
    );
};

export default InputTodo;
