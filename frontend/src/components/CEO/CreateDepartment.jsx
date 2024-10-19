import React, { useEffect, useState, useRef } from "react";
import SidebarCEO from "./SidebarCEO";
import { UserData, createDepartment } from "../../Global/apiCall";
import Alert from "../../utils/Alert";

const CreateDepartment = () => {
  const [data, setData] = useState([]);
  const [department, setDepartment] = useState({
    department_name: "",
    manager_id: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState();
  const department_name = useRef();
  const manager_id = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await UserData();
        setData(userData.data); // Store user data
      } catch (error) {
        console.error("Error while retrieving data from users", error);
      }
    };
    fetchData();
  }, []);

  const getInfo = (e) => {
    const { name, value } = e.target;
    // console.log(`${name}:${value}`)
    setDepartment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateDepartment = (e) => {
    e.preventDefault(); // Prevent default form submission
    createDepartment(department)
      .then((response) => {
        // console.log(response.data);
        department_name.current.value = "";
        manager_id.current.value = "";
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 6000);
        setMessage("Department Created successfully!");
        // alert("Department Created successfully!");
        setDepartment({
          department_name: "",
          manager_id: "",
        });
      })
      .catch((error) => {
        department_name.current.value = "";
        manager_id.current.value = "";
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 6000);
        setMessage("Error while creating department");
        console.error("Error:", error);
        // alert("Failed to create department. Please try again.");
      });
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#f7f7f8" }}>
      <SidebarCEO />
      <div
        style={{
          border: "0px solid black",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {showAlert && (
          <div style={{ position: "absolute", top: "26px", width: "100%" }}>
            <Alert message={message} />
          </div>
        )}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            width: "350px",
            borderRadius: "10px",
          }}
        >
          <h5>Create Department</h5>
          <input
            type="text"
            onChange={getInfo}
            required
            placeholder="Department Name"
            ref={department_name}
            name="department_name"
            style={{
              width: "100%",
              marginTop: "12px",
              border: "none",
              backgroundColor: "#f7f7f8",
              padding: "6px",
              borderRadius: "10px",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              marginTop: "12px",
            }}
          >
            <p style={{ marginTop: "15px" }}>Assign to: </p>
            <select
              style={{
                backgroundColor: "#f7f7f8",
                padding: "6px 10px",
                border: "none",
                borderRadius: "10px",
              }}
              onChange={getInfo}
              name="manager_id"
              id=""
              ref={manager_id}
            >
              <option value="">select</option>
              {data.map((user, index) => (
                <option value={user._id} key={index}>
                  {user.first_name} {user.last_name}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "12px",
            }}
          >
            <button
              onClick={handleCreateDepartment}
              style={{
                border: "none",
                padding: "8px 12px",
                borderRadius: "10px",
                color: "#ffffff",
                backgroundColor: "#605bff",
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDepartment;
