
import React, { useState, useEffect } from "react";
import axios from "axios";


const DashboardPage = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/employees?page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployees(response.data.data);
      } catch (error) {
        setError("Error fetching employees");
      }
    };

    fetchEmployees();
  }, [page, limit]);

  return (
    <div>
      <h2>Employee List</h2>
      {error && <div className="error">{error}</div>}
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.first_name} {employee.last_name} - {employee.position}
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default DashboardPage;
