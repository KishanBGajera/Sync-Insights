import React, { useState, useEffect } from "react";
import LineChart from "../Charts/LineChart";
import {
  getAllTask,
  DepartmentData,
  GetDepartmentNameById,
} from "../../global/apiCall";
import PieChart from "../Charts/PieChart";
import DepartmentWiseSummary from "./DepartmentWiseSummary";

const OverallStats = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [completedOnDates, setCompletedOnDates] = useState([]);
  const [dateCount, setDateCount] = useState({});
  const [departmentCount, setDepartmentCount] = useState({});
  const [departmentNames, setDepartmentNames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await getAllTask();
        const departmentData = await DepartmentData();
        const tasks = userData.data;

        const doneTasks = tasks.filter((task) => task.status === "completed");
        // console.log("completed tasks", doneTasks);
        // console.log("department",departmentData)

        setCompletedTasks(doneTasks);
        setDepartmentNames(departmentData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error while retrieving data from task by userId", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (completedTasks.length > 0) {
      // Extract completed_on dates and filter out null or undefined dates
      let dates = completedTasks
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
  }, [completedTasks]);

  useEffect(() => {
    let count = {};
    completedTasks.forEach((task) => {
      if (count[task.department_id]) {
        count[task.department_id]++;
      } else {
        count[task.department_id] = 1;
      }
    });

    setDepartmentCount(count);
  }, [completedTasks]);

  useEffect(() => {
    const fetchDepartmentNames = async () => {
      const IDs = Object.keys(departmentCount);
      const names = [];

      for (const id of IDs) {
        if (id === "undefined") {
          names.push("Not Specified");
        } else {
          try {
            const dept = await GetDepartmentNameById(id);
            if (dept.status === 200) {
              names.push(dept.data.department_name);
            } else {
              console.error(
                "Failed to fetch department name:",
                dept.statusText
              );
              names.push("Error Fetching Department Name");
            }
          } catch (error) {
            console.error("Error fetching department name:", error);
            names.push("Error Fetching Department Name");
          }
        }
      }

      setDepartmentNames(names);
    };

    fetchDepartmentNames();
  }, [departmentCount]);

  // console.log("departmentNames", departmentNames)
  // console.log("Sorted Completed Dates:", completedOnDates);
  // console.log("Date Count:", dateCount); // Output the counts of each date
  // console.log("Department Count:", departmentCount);

  return (
    <div style={{ border: "0px solid black", width: "100%", padding: "16px" }}>
      <h3 style={{ borderBottom: "1px solid #9a9a9a" }}>Stats Summary</h3>
      {loading ? (
        <div
          style={{
            border: "0px solid black",
            marginTop: "20px",
            height: "200px",
            alignItems: "center",
          }}
          className="d-flex justify-content-center"
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: "4px" }}>
            <LineChart
              data={Object.values(dateCount)}
              labels={Object.keys(dateCount)}
              width={600}
              height={432}
            ></LineChart>
            <PieChart
              data={Object.values(departmentCount)}
              labels={Object.values(departmentNames)}
              width={500}
              height={432}
            />
          </div>
          <div style={{ marginTop: "24px", overflow: "hidden" }}>
            <h5 style={{ borderBottom: "1px solid #9a9a9a" }}>
              Department-wise Summary
            </h5>
            <DepartmentWiseSummary />
          </div>
        </>
      )}
    </div>
  );
};

export default OverallStats;
