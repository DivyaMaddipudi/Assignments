import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:4000/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      console.log("success");
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:4000/employees").then((response) => {
      // console.log(response);
      setEmployeeList(response.data);
    });
  };

  return (
    <div className="App">
      <div className="info">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        ></input>
        <label> Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        ></input>
        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        ></input>
        <label>Wage (year):</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        ></input>
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>
        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <h3>Name: {val.name}</h3>
              <h3>Age: {val.age}</h3>
              <h3>Country: {val.country}</h3>
              <h3>Position: {val.position}</h3>
              <h3>Wage: {val.wage}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
