import { useState } from 'react'
import { InsertUser } from "../global/apiCall";
import '../style/InsertUser.css'

function Manager_insert() {
    const [insertUser, setinsertUser] = useState({ fullname: "", username: "", email: "", department: "Sales", position: "", password: "" });

    const getInfo = (i) => {
      console.log(i.target.name, i.target.value);
      setinsertUser({ ...insertUser, [i.target.name]: i.target.value });
    };
    const handleInsertUser = (e) => {
      InsertUser(insertUser)
        .then((response) => {
          console.log(response.data);
          alert("User registered successfully!");
          setinsertUser({ fullname: "", username: "", email: "", department: "Sales", position: "", password: "" });
        })
        .catch((error) => {
          // Handle error
          console.error("Error:", error);
          alert("Failed to register user. Please try again.");
        });
    };
  return (
    <div className='act-user'>
      <div className='user-add'>
        <input type="text" name="fullname" placeholder="fullname" onChange={getInfo} />
        <input type="text" name="username" placeholder="username" onChange={getInfo} />
        <input type="email" name="email" placeholder="email" onChange={getInfo} />
       <input type="text" readOnly value={insertUser.department} name="department" id="department" onChange={getInfo} />
        <select name="position" id="position" onChange={getInfo} >
          {/* <option value="Manager">Manager</option> */}
          <option value="" aria-readonly>Select Position</option>
          <option value="Associate">Associate</option>
          <option value="Analyst">Analyst</option>
        </select>
        <input type="password" name="password" placeholder="password" onChange={getInfo} />
        <button onClick={handleInsertUser}>Add User</button>
      </div>
    </div>
  )
}

export default Manager_insert;