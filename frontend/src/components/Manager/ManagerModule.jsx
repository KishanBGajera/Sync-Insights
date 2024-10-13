import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import { IoAddOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import { GrOrganization } from "react-icons/gr";
import { MdOutlineSensorOccupied } from "react-icons/md";
import "../../style/Manager/Managermodule.css";
import {
  DepartmentData,
  InsertUser,
  RoleData,
  UserData,
} from "../../global/apiCall.jsx";
import SideChart from "../../utils/SideChart.jsx";

const ManagerModule = () => {
  // const data = [
  //   {
  //     name: "John Deo",
  //     email: "johndoe2211@gmail.com",
  //     phone: "+33757005467",
  //     gender: "Male",
  //     type: "UI/UX Designer",
  //   },
  //   {
  //     name: "Shelby Goode",
  //     email: "shelbygoode481@gmail.com",
  //     phone: "+33757005467",
  //     gender: "Female",
  //   },
  //   {
  //     name: "John Deo",
  //     email: "johndoe2211@gmail.com",
  //     phone: "+33757005467",
  //     gender: "Male",
  //   },
  //   {
  //     name: "Shelby Goode",
  //     email: "shelbygoode481@gmail.com",
  //     phone: "+33757005467",
  //     gender: "Female",
  //   },
  //   {
  //     name: "John Deo",
  //     email: "johndoe2211@gmail.com",
  //     phone: "+33757005467",
  //     gender: "Male",
  //   },
  //   {
  //     name: "Shelby Goode",
  //     email: "shelbygoode481@gmail.com",
  //     phone: "+33757005467",
  //     gender: "Female",
  //   },
  //   {
  //     name: "John Deo",
  //     email: "johndoe2211@gmail.com",
  //     phone: "+33757005467",
  //     gender: "Male",
  //   },
  //   {
  //     name: "Shelby Goode",
  //     email: "shelbygoode481@gmail.com",
  //     phone: "+33757005467",
  //     gender: "Female",
  //   },
  //   {
  //     name: "John Deo",
  //     email: "johndoe2211@gmail.com",
  //     phone: "+33757005467",
  //     gender: "Male",
  //   },
  //   {
  //     name: "Shelby Goode",
  //     email: "shelbygoode481@gmail.com",
  //     phone: "+33757005467",
  //     gender: "Female",
  //   },
  //   {
  //     name: "John Deo",
  //     email: "johndoe2211@gmail.com",
  //     phone: "+33757005467",
  //     gender: "Male",
  //   },
  //   {
  //     name: "Shelby Goode",
  //     email: "shelbygoode481@gmail.com",
  //     phone: "+33757005467",
  //     gender: "Female",
  //   },
  //   {
  //     name: "John Deo",
  //     email: "johndoe2211@gmail.com",
  //     phone: "+33757005467",
  //     gender: "Male",
  //   },
  //   {
  //     name: "Shelby Goode",
  //     email: "shelbygoode481@gmail.com",
  //     phone: "+33757005467",
  //     gender: "Female",
  //   },
  // ];

  const [makeVisible, setMakeVisible] = useState(null);
  const [employee, setEmployee] = useState(false);
  const [registerUser, setregisterUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    role_id: "",
    department_id: "",
    status: "",
  });
  const [data, setData] = useState([]);
  const [dept, setDept] = useState([]);
  const [role, setRole] = useState([]);
  const handleVisibility = (index) => {
    setMakeVisible(index === makeVisible ? null : index);
  };
  const handleEmployee = () => {
    setEmployee(!employee);
  };

  const getInfo = (e) => {
    const { name, value } = e.target;
    // console.log(`${name}:${value}`);
    setregisterUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await DepartmentData();
        const response2 = await RoleData();
        const userData = await UserData();
        // console.log(response1.data, response2.data, userData.data);
        setDept(response1.data); // async state update
        setRole(response2.data);
        setData(userData.data); // async state update
      } catch (error) {
        console.error(
          "Error while retrieving data from department and role",
          error
        );
      }
    };

    fetchData();
  }, []);

  // Separate useEffect to log state when it's updated

  const handleInsertUser = (e) => {
    e.preventDefault(); // Prevent default form submission
    InsertUser(registerUser)
      .then((response) => {
        // console.log(response.data);
        alert("User registered successfully!");
        setregisterUser({
          first_name: "",
          last_name: "",
          email: "",
          username: "",
          password: "",
          role_id: "",
          department_id: "",
        });
        window.location.href = "/insights/dashboard";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to register user. Please try again.");
      });
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar></Sidebar>
      {employee ? (
        <div className="employee-container">
          <div onClick={handleEmployee} className="employee-container-header">
            <IoIosArrowRoundBack style={{ fontSize: "28px" }} />
            <p style={{ fontSize: "18px" }}>Back</p>
          </div>
          <div className="employee-insert">
            <div className="employee-form">
              <h3>New Employee </h3>
              <p style={{ color: "#9a9a9a" }}>
                Enter the details for a new employee.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "6px",
                  }}
                  className="form-details"
                >
                  <span>First Name</span>
                  <input
                    onChange={getInfo}
                    style={{ marginTop: "6px", width: "240px" }}
                    required
                    name="first_name"
                    type="text"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "6px",
                  }}
                  className="form-details"
                >
                  <span>Last Name</span>
                  <input
                    onChange={getInfo}
                    style={{ marginTop: "6px", width: "240px" }}
                    name="last_name"
                    required
                    type="text"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "6px",
                  }}
                  className="form-details"
                >
                  <span>Username</span>
                  <input
                    onChange={getInfo}
                    style={{ marginTop: "6px", width: "240px" }}
                    name="username"
                    required
                    type="text"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "6px",
                  }}
                  className="form-details"
                >
                  <span>Password</span>
                  <input
                    onChange={getInfo}
                    style={{ marginTop: "6px", width: "240px" }}
                    required
                    name="password"
                    type="text"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "6px",
                  }}
                  className="form-details"
                >
                  <span>Email</span>
                  <input
                    onChange={getInfo}
                    style={{ marginTop: "6px", width: "240px" }}
                    name="email"
                    required
                    type="email"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "6px",
                  }}
                  className="form-details"
                >
                  <span>Status</span>
                  <select
                    onChange={getInfo}
                    style={{
                      marginTop: "6px",
                      width: "240px",
                      border: "none",
                      backgroundColor: "#f7f7f8",
                      borderRadius: "5px",
                      padding: "3.5px 5px",
                      color: "black",
                    }}
                    required
                    name="status"
                  ><option value="">select</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "6px",
                  }}
                  className="form-details"
                >
                  <span>Role</span>
                  <select
                    onChange={getInfo}
                    style={{
                      marginTop: "6px",
                      width: "240px",
                      border: "none",
                      backgroundColor: "#f7f7f8",
                      borderRadius: "5px",
                      padding: "3.5px 5px",
                      color: "black",
                    }}
                    required
                    name="role_id"
                  >
                    <option value="">select</option>
                    {role.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.role_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "6px",
                  }}
                  className="form-details"
                >
                  <span>Department</span>
                  <select
                    onChange={getInfo}
                    style={{
                      marginTop: "6px",
                      width: "240px",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "#f7f7f8",
                      padding: "3.5px 5px",
                    }}
                    required
                    name="department_id"
                  >
                    <option value="">select</option>
                    {dept.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.department_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <button onClick={handleInsertUser} type="submit">
                    Add Employee
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="manager-content-container">
            <div className="manager-header-content">
              <h4>Employees</h4>
              <button
                onClick={handleEmployee}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 10px",
                  border: "none",
                  color: "white",
                  backgroundColor: "#605BFF",
                  borderRadius: "10px",
                }}
              >
                <IoAddOutline style={{ color: "white" }} />
                Add Employee
              </button>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr onClick={() => handleVisibility(index)} key={index}>
                      <td
                        style={{
                          borderTopLeftRadius: "20px",
                          borderBottomLeftRadius: "20px",
                        }}
                      >
                        <div className="table-cell">
                          <img
                            className="avatar"
                            src={`https://ui-avatars.com/api/?name=${item.first_name}+${item.last_name}`}
                            alt="Avatar"
                          />
                          <span>
                            {item.first_name} {item.last_name}
                          </span>
                        </div>
                      </td>
                      <td>{item.email}</td>
                      {dept.map((val, index) =>
                        item.department_id === val._id ? (
                          <td key={index}>{val.department_name}</td>
                        ) : null
                      )}

                      <td
                        style={{
                          borderTopRightRadius: "20px",
                          borderBottomRightRadius: "20px",
                        }}
                      >
                        <span className={`gender ${item.status.toLowerCase()}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {data.map(
            (item, index) =>
              makeVisible === index && (
                <div key={index} className="employee-info">
                  <div className="employee-info-header">
                    <img
                      style={{ borderRadius: "20px" }}
                      src={`https://ui-avatars.com/api/?name=${item.first_name}+${item.last_name}`}
                      alt={item.name}
                    />
                    <h4 style={{ marginTop: "5px" }}>{item.first_name} {item.last_name}</h4>
                    <p style={{ marginTop: "-8px", fontSize: "12px" }}>
                      {item.type}
                    </p>
                  </div>
                  <div className="employee-info-contact">
                    <h5 style={{marginTop:"-10px",marginBottom:'20px'}}>Contact Info</h5>
                    <div className="contact-info">
                      <MdEmail style={{ fontSize: "25px", color: "b4b4bf" }} />
                      <p>{item.email}</p>
                    </div>
                    <div className="contact-info">
                      <MdOutlineSensorOccupied
                        style={{ fontSize: "20px", color: "b4b4bf" }}
                      />
                      {role.map((val, index) =>
                        item.role_id === val._id ? (
                          <p key={index}>{val.role_name}</p>
                        ) : null
                      )}
                    </div>
                    <div className="contact-info">
                      <GrOrganization
                        style={{ fontSize: "20px", color: "b4b4bf" }}
                      />
                      {dept.map((val, index) =>
                        item.department_id === val._id ? (
                          <p key={index}>{val.department_name}</p>
                        ) : null
                      )}
                    </div>
                    <div>
                      <SideChart id={item._id} />
                    </div>
                  </div>
                </div>
              )
          )}
        </>
      )}
    </div>
  );
};

export default ManagerModule;
