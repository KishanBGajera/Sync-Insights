import { useState } from 'react'
import { InsertUser } from "../Global/apiCall";
import '../style/InsertUser.css'
function Insert_user() {
  const [insertUser, setinsertUser] = useState({ fullname: "", username: "", email: "", department: "", position: "", password: "" });

  const getInfo = (i) => {
    console.log(i.target.name, i.target.value);
    setinsertUser({ ...insertUser, [i.target.name]: i.target.value });
  };
  const handleInsertUser = () => {
    InsertUser(insertUser)
      .then((response) => {
        console.log(response.data);
        alert("User registered successfully!");
        setinsertUser({ fullname: "", username: "", email: "", department: "", position: "", password: "" });
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
        <select name="department" onChange={getInfo} id="department">
        <option value="" aria-readonly>Select Department</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Operations">Operations</option>
        </select>
        <select name="position" id="position" onChange={getInfo} >
        <option value="" aria-readonly>Select Position</option>
          <option value="Manager">Manager</option>
          {/* <option value="Associate">Associate</option>
          <option value="Analyst">Analyst</option> */}
        </select>
        <input type="password" name="password" placeholder="password" onChange={getInfo} />
        <button onClick={handleInsertUser}>Add User</button>
      </div>
    </div>
  )
}

export default Insert_user