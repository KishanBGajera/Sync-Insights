import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { GetAllTask } from "../../Global/apiCall";
import { AuthContext } from "../../store/AuthContext";
import BarChart from "../Charts/BarChart";

const Insights = () => {
  const [userTasks, setUserTasks] = useState([]);
  const [completedOnDates, setCompletedOnDates] = useState([]);
  const [dateCount, setDateCount] = useState({});
  const { Details } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (Details) {
        try {
          const userData = await GetAllTask(Details._id);
          const tasks = userData.data;
          // console.log(tasks);

          const doneTasks = tasks.filter((task) => task.status === "completed");
          setUserTasks(doneTasks);
        } catch (error) {
          console.error(
            "Error while retrieving data from task by userId",
            error
          );
        }
      }
    };
    fetchData();
  }, [Details._id]);

  useEffect(() => {
    if (userTasks.length > 0) {
      // Extract completed_on dates and filter out null or undefined dates
      let dates = userTasks
        .map((task) => task.completed_on)
        .filter((date) => date); // This removes any null or undefined dates

      // Sort the dates
      dates.sort((a, b) => {
        if (!a || !b) return 0; // Ensure dates are valid before splitting
        let [dayA, monthA, yearA] = a.split("/");
        let [dayB, monthB, yearB] = b.split("/");

        // Compare by year first
        if (yearA !== yearB) {
          return yearA - yearB;
        }
        // If years are the same, compare by month
        if (monthA !== monthB) {
          return monthA - monthB;
        }
        // If months are the same, compare by day
        return dayA - dayB;
      });

      // Set sorted dates to state
      setCompletedOnDates(dates);

      // Count occurrences of each date
      let count = {};
      dates.forEach((date) => {
        if (count[date]) {
          count[date]++;
        } else {
          count[date] = 1;
        }
      });

      // Set date count to state
      setDateCount(count);
    }
  }, [userTasks]);

  return (
    <div style={{ backgroundColor: "#f7f7f8", display: "flex" }}>
      <Sidebar />
      <div style={{ width: "100%", padding: "20px" }}>
        <h4>Personal Insight</h4>
        <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <BarChart
            data={Object.values(dateCount)}
            labels={Object.keys(dateCount)}
            width={650}
            height={500}
            name={name}
          />
        </div>
      </div>
    </div>
  );
};

export default Insights;
