import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8000/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployee(response.data.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
        setError("Error fetching employee details");
      }
    };
    fetchEmployee();
  }, [id]);

  return (
    <><div>
          <h2>Employee Details</h2>
          {error && <div className="error">{error}</div>}
          <p>First Name: {employee.first_name}</p>
          <p>Last Name: {employee.last_name}</p>
          <p>Email: {employee.email}</p>
          <p>Position: {employee.position}</p>
          <p>Salary: {employee.salary}</p>
          <p>Department: {employee.department}</p>
      </div><button onClick={() => window.location.replace("/employees")}>Back</button></>
  );
};

export default ViewEmployee;
