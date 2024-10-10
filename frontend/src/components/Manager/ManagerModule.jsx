import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import { IoAddOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import "../../style/Manager/Managermodule.css";
import { DepartmentData, InsertUser, RoleData } from "../../global/apiCall.jsx";

const ManagerModule = () => {
  const data = [
    {
      name: "John Deo",
      email: "johndoe2211@gmail.com",
      phone: "+33757005467",
      gender: "Male",
      type: "UI/UX Designer",
    },
    {
      name: "Shelby Goode",
      email: "shelbygoode481@gmail.com",
      phone: "+33757005467",
      gender: "Female",
    },
    {
      name: "John Deo",
      email: "johndoe2211@gmail.com",
      phone: "+33757005467",
      gender: "Male",
    },
    {
      name: "Shelby Goode",
      email: "shelbygoode481@gmail.com",
      phone: "+33757005467",
      gender: "Female",
    },
    {
      name: "John Deo",
      email: "johndoe2211@gmail.com",
      phone: "+33757005467",
      gender: "Male",
    },
    {
      name: "Shelby Goode",
      email: "shelbygoode481@gmail.com",
      phone: "+33757005467",
      gender: "Female",
    },
    {
      name: "John Deo",
      email: "johndoe2211@gmail.com",
      phone: "+33757005467",
      gender: "Male",
    },
    {
      name: "Shelby Goode",
      email: "shelbygoode481@gmail.com",
      phone: "+33757005467",
      gender: "Female",
    },
    {
      name: "John Deo",
      email: "johndoe2211@gmail.com",
      phone: "+33757005467",
      gender: "Male",
    },
    {
      name: "Shelby Goode",
      email: "shelbygoode481@gmail.com",
      phone: "+33757005467",
      gender: "Female",
    },
    {
      name: "John Deo",
      email: "johndoe2211@gmail.com",
      phone: "+33757005467",
      gender: "Male",
    },
    {
      name: "Shelby Goode",
      email: "shelbygoode481@gmail.com",
      phone: "+33757005467",
      gender: "Female",
    },
    {
      name: "John Deo",
      email: "johndoe2211@gmail.com",
      phone: "+33757005467",
      gender: "Male",
    },
    {
      name: "Shelby Goode",
      email: "shelbygoode481@gmail.com",
      phone: "+33757005467",
      gender: "Female",
    },
  ];

  const [makeVisible, setMakeVisible] = useState(null);
  const [employee, setEmployee] = useState(false);
  const [registerUser, setregisterUser] = useState({ first_name: "", last_name: "", email: "", username:"",password:"",job_id:"",department_id:""});
  const handleVisibility = (index) => {
    setMakeVisible(index === makeVisible ? null : index);
  };
  const handleEmployee = () => {
    setEmployee(!employee);
  };

  const getInfo = (e) => {
    const { name, value } = e.target;
    // if (name in registerUser.role_id) {
    //     setregisterUser(prevState => ({
    //         ...prevState,
    //         address: {
    //             ...prevState.address,
    //             [name]: value
    //         }
    //     }));
    // } else {
    console.log(`${name}:${value}`)
        setregisterUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    // }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await DepartmentData();
        const response2 = await RoleData();
        console.log(response);
        //   setShipment(response.data.data);
      } catch (error) {
        console.error("erroe while retriving data from departmant and role", error);
      }
    };

    fetchData();
  }, []);

  const handleInsertUser = (e) => {
    e.preventDefault(); // Prevent default form submission
    InsertUser(registerUser)
        .then((response) => {
            console.log(response.data);
            alert("User registered successfully!");
            setregisterUser({
              first_name: "", last_name: "", email: "", username:"",password:"",job_id:"",department_id:""
            });
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
                  <input onChange={getInfo}
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
                  <input onChange={getInfo}
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
                  <input onChange={getInfo}
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
                  <input onChange={getInfo}
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
                  <input onChange={getInfo}
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
                  <span>Salary</span>
                  <input
                    style={{ marginTop: "6px", width: "240px" }}
                    required
                    name="phone"
                    type="text"
                    maxLength={10}
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
                  <span>Role</span>
                  <select onChange={getInfo}
                    style={{
                      marginTop: "6px",
                      width: "240px",
                      border: "none",
                      backgroundColor: "#f7f7f8",
                      borderRadius: "5px",
                      padding: "3.5px 5px",
                    }}
                    required
                    name="role_id"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
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
                  <select onChange={getInfo}
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
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
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
                  <button onClick={handleInsertUser} type="submit">Add Employee</button>
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
                    <th>Phone number</th>
                    <th>Gender</th>
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
                            src={`https://ui-avatars.com/api/?name=${item.name}`}
                            alt="Avatar"
                          />
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td
                        style={{
                          borderTopRightRadius: "20px",
                          borderBottomRightRadius: "20px",
                        }}
                      >
                        <span className={`gender ${item.gender.toLowerCase()}`}>
                          {item.gender}
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
                      src={`https://ui-avatars.com/api/?name=${item.name}`}
                      alt={item.name}
                    />
                    <h5 style={{ marginTop: "5px" }}>{item.name}</h5>
                    <p style={{ marginTop: "-8px", fontSize: "12px" }}>
                      {item.type}
                    </p>
                  </div>
                  <div className="employee-info-contact">
                    <h5>Contact Info</h5>
                    <div className="contact-info">
                      <MdEmail style={{ fontSize: "25px", color: "b4b4bf" }} />
                      <p>{item.email}</p>
                    </div>
                    <div className="contact-info">
                      <FaPhoneAlt
                        style={{ fontSize: "20px", color: "b4b4bf" }}
                      />
                      <p>{item.phone}</p>
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
