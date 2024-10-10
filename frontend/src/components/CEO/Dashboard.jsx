import React, { useContext, useState, useEffect } from "react";
import SidebarCEO from "./SidebarCEO";
import { AuthContext } from "../../store/AuthContext";

const Dashboard = () => {
  const { Details } = useContext(AuthContext);
  const [task, setTask] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Details._id) {
          const userData = await GetAllTask(Details._id);
          setTask(userData);
        }
      } catch (error) {
        console.error("Error while retrieving data from users", error);
      }
    };

    if (Details) {
      fetchData();
    }
  }, [Details]);
  return (
    <div style={{ backgroundColor: "#f7f7f8", display: "flex" }}>
      <SidebarCEO />
    </div>
  );
};

export default Dashboard;
