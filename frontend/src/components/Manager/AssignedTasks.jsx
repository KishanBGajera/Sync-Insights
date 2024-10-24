import React, { useContext, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { GetTaskByCreatedId, UserData } from "../../global/apiCall";
import { AuthContext } from "../../store/AuthContext";

const AssignedTasks = () => {
  const { Details } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (Details) {
        try {
          const TaskData = await GetTaskByCreatedId(Details._id);
          const userData = await UserData();
        //   console.log(TaskData.data);
        //   console.log(userData);
          setData(TaskData.data.reverse());
          setEmployee(userData.data);
        } catch (error) {
          console.error(
            "Error while retrieving data from department and role",
            error
          );
        }
      }
    };

    fetchData();
  }, [Details]);

  return (
    <div
      style={{
        backgroundColor: "#f7f7f8",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Sidebar />
      <div
        style={{
          height: "100vh",
          width: "100%",
          padding: "25px",
          overflow: "scroll",
          border: "0px solid black",
          scrollbarWidth: "none",
        }}
      >
        <h4>Assigned Tasks</h4>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Assigned To</th>
                <th>Deadline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      borderTopLeftRadius: "20px",
                      borderBottomLeftRadius: "20px",
                    }}
                  >
                    <div className="table-cell">
                      <span>{item.task_name}</span>
                    </div>
                  </td>
                  <td>
                    {employee.map((user, index) =>
                      item.assigned_to == user._id
                        ? user.first_name + " " + user.last_name
                        : ""
                    )}
                  </td>
                  <td>
                    {new Date(item.deadline).getDate() +
                      "/" +
                      new Date(item.deadline).getMonth() +
                      "/" +
                      new Date(item.deadline).getFullYear()}
                  </td>
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
    </div>
  );
};

export default AssignedTasks;
