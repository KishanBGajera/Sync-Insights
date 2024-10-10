import React, { useContext, useState,useEffect } from "react";
import SidebarCEO from "./SidebarCEO";
import { AuthContext } from "../../store/AuthContext";
import { getAllTask } from "../../Global/apiCall";

const Dashboard = () => {
  const { Details } = useContext(AuthContext);
  const [task, setTask] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
          const userData = await getAllTask();
          console.log(userData.data)
          setTask(userData.data);
          console.log(userData.data.filter((task) => task.assigned_to === "67051b955927154766b96cf4")); 
          // setTask(userData);

      } catch (error) {
        console.error("Error while retrieving data from users", error);
      }
    };

    if (Details) {
      fetchData();
    }
  }, [Details]);
  return (
    <div style={{ backgroundColor: "#f7f7f8" }}>
      <SidebarCEO />
    </div>
  );
};

export default Dashboard;
