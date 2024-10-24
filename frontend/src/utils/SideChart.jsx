import React, { useEffect, useState } from "react";
import BarChart from "../components/Charts/BarChart";
import { GetAllTask } from "../global/apiCall";

const SideChart = ({ id }) => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [completedOnDates, setCompletedOnDates] = useState([]);
  const [dateCount, setDateCount] = useState({}); // State to hold date counts

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await GetAllTask(id);
        const tasks = userData.data;

        const doneTasks = tasks.filter((task) => task.status === "completed");
        setCompletedTasks(doneTasks);
      } catch (error) {
        console.error("Error while retrieving data from task by userId", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (completedTasks.length > 0) {
      // Extract completed_on dates and filter out null or undefined dates
      let dates = completedTasks
        .map((task) => task.completed_on)
        .filter((date) => date); // This removes any null or undefined dates

      // Sort the dates
      dates.sort((a, b) => {
        if (!a || !b) return 0; // Ensure dates are valid before splitting
        let [dayA, monthA, yearA] = a.split('/');
        let [dayB, monthB, yearB] = b.split('/');

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
      dates.forEach(date => {
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

  return (
    <div>
      <h5>Insights</h5>
      <BarChart data={Object.values(dateCount).slice(-5)} labels={Object.keys(dateCount).slice(-5)} width={200} height={228} />
    </div>
  );
};

export default SideChart;
