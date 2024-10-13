import React, { useState, useEffect } from "react";
import { DepartmentData, GetDepartmentNameById } from "../../global/apiCall";
import DepartmentSummary from "./DepartmentSummary";

const DepartmentWiseSummary = () => {
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await DepartmentData();
        console.log(response1.data);
        setDepartmentData(response1.data); // async state update
      } catch (error) {
        console.error(
          "Error while retrieving data from department and role",
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{display:"flex",flexWrap:"wrap",gap:"20px",marginTop:"16px"}}>
      {departmentData.map((department) => (
        <DepartmentSummary id={department._id} name={department.department_name} />
      ))}
    </div>
  );
};

export default DepartmentWiseSummary;
