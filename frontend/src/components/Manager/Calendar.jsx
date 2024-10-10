import React, { useState, useEffect, useContext } from "react";
import { IoMdClose } from "react-icons/io";
import "../../style/Manager/Calendar.css";
import Sidebar from "./Sidebar";
import { InsertTask, UserData } from "../../global/apiCall.jsx";
import { AuthContext } from "../../store/AuthContext.jsx";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { Details } = useContext(AuthContext);
  const [task, setTask] = useState(false);
  const [data, setData] = useState([]);
  const [Task, settask] = useState({
    task_name: "",
    task_description: "",
    created_by: "",
    assigned_to: "",
    deadline: "",
    department_id:""
  });

  const handleTask = (index) => {
    setTask(task == index ? null : index);
  };

  const getInfo = (e) => {
    const { name, value } = e.target;
    console.log(`${name}:${value}`);
    settask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (Details && Details.department_id) {
      settask((prevState) => ({
        ...prevState,
        department_id: Details.department_id,
        created_by:Details._id
      }));
    }
  }, [Details]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await UserData();
        console.log(userData.data);
        setData(userData.data); // async state update
      } catch (error) {
        console.error("Error while retrieving data from users", error);
      }
    };
    fetchData();
  }, []);

  const handleInsertUser = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(Task)
    InsertTask(Task)
      .then((response) => {
        console.log(response.data);
        alert("Task added successfully!");
        settask({
          task_name: "",
          task_description: "",
          assigned_to: "",
          deadline: "",
        });
        // window.location.href = "/insights/calendar";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to register task. Please try again.");
      });
  };

  const renderHeader = () => {
    const monthName = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();

    return (
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>◀</button>
        <div
          style={{ color: "#4f4e6a", fontSize: "18px" }}
        >{`${monthName} ${year}`}</div>
        <button onClick={() => changeMonth(1)}>▶</button>
      </div>
    );
  };

  const renderDays = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="calendar-days">
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar-day">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const daysInMonth = endOfMonth.getDate();

    const prevMonthEnd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    const prevMonthDays = prevMonthEnd.getDate();

    const startDayOfWeek = startOfMonth.getDay();
    const daysArray = [];

    for (let i = startDayOfWeek; i > 0; i--) {
      daysArray.push(
        <div key={`prev-${i}`} className="calendar-cell prev-month">
          <span>{prevMonthDays - i + 1}</span>
        </div>
      );
    }

    // Fill in the actual days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(
        <div
          key={day}
          onClick={() => handleTask(day)}
          className="calendar-cell"
        >
          <span>{day}</span>
        </div>
      );
    }

    // Fill in the remaining cells with the next month's dates
    const totalCells = daysArray.length;
    const remainingCells = 35 - totalCells;

    for (let i = 1; i <= remainingCells; i++) {
      daysArray.push(
        <div key={`next-${i}`} className="calendar-cell next-month">
          <span>{i}</span>
        </div>
      );
    }

    return <div className="calendar-cells">{daysArray}</div>;
  };

  const changeMonth = (monthChange) => {
    setCurrentDate(
      new Date(currentDate.setMonth(currentDate.getMonth() + monthChange))
    );
  };

  return (
    <div
      style={{ display: "flex", background: "#f7f7f8", position: "relative" }}
    >
      <Sidebar></Sidebar>
      <h4 className="calendar-h4">Calendar</h4>
      {task && (
        <div className="create-event">
          <div className="event-header">
            <p style={{ fontSize: "20px", fontWeight: "500" }}>
              Create an Event
            </p>
            <IoMdClose
              onClick={() => handleTask()}
              style={{
                fontSize: "35px",
                borderRadius: "15px",
                padding: "4px 0",
                marginTop: "-12px",
                cursor: "pointer",
                color: "#ee5d6f",
                backgroundColor: "fef3f6",
              }}
            />
          </div>
          <input
            onChange={getInfo}
            name="task_name"
            type="text"
            style={{
              width: "100%",
              border: "none",
              backgroundColor: "#f7f7f8",
              height: "36px",
              outline: "none",
              padding: "0 10px",
              borderRadius: "10px",
            }}
            placeholder="Task Title"
          />
          <textarea
            name="task_description"
            onChange={getInfo}
            rows={5}
            style={{
              width: "100%",
              border: "none",
              backgroundColor: "#f7f7f8",
              padding: "0 6px",
              borderRadius: "10px",
              outline: "none",
              marginTop: "20px",
            }}
          ></textarea>
          <div>
            <p>Assign to: </p>
            <select onChange={getInfo} name="assigned_to" id="">
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
              width: "100%",
              marginTop: "20px",
              border: "0px solid black",
              height: "35px",
              gap: "10px",
            }}
          >
            <input
              name="deadline"
              onChange={getInfo}
              style={{
                width: "50%",
                border: "none",
                backgroundColor: "#f7f7f8",
                padding: "0 6px",
                borderRadius: "10px",
                outline: "none",
              }}
              type="date"
            />
            <input
              style={{
                width: "50%",
                border: "none",
                backgroundColor: "#f7f7f8",
                padding: "0 6px",
                borderRadius: "10px",
                outline: "none",
              }}
              type="time"
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
              padding: "12px 0",
            }}
          >
            <button
              onClick={handleInsertUser}
              style={{
                border: "none",
                backgroundColor: "#605bff",
                color: "#ffffff",
                padding: "8px 11px",
                borderRadius: "10px",
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}

      <div className="calendar">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default Calendar;
