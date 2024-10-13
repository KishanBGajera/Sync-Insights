import React, { useEffect, useState } from "react";
import { GetTaskByDepartmentId } from "../../global/apiCall";
import BarChart from "../Charts/BarChart";

const DepartmentSummary = ({ id, name }) => {
  // const [departmentData, setDepartmentData] = useState();
  const [departmentTasks, setDepartmentTasks] = useState([]);
  const [completedOnDates, setCompletedOnDates] = useState([]);
  const [dateCount, setDateCount] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await GetTaskByDepartmentId(id);
        const tasks = userData.data;
        // console.log(tasks);

        const doneTasks = tasks.filter((task) => task.status === "completed");
        setDepartmentTasks(doneTasks);
      } catch (error) {
        console.error("Error while retrieving data from task by userId", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (departmentTasks.length > 0) {
      // Extract completed_on dates and filter out null or undefined dates
      let dates = departmentTasks
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
  }, [departmentTasks]);

  // console.log("Sorted Completed Dates:", completedOnDates);
  // console.log("Date Count:", dateCount); // Output the counts of each date

  return (
    <div>
      <h6>{name}</h6>
      <BarChart
        data={Object.values(dateCount)}
        labels={Object.keys(dateCount)}
        width={350}
        height={300}
        name={name}
      />
    </div>
  );
};

export default DepartmentSummary;
