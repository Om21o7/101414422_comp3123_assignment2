import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`http://localhost:8000/employees?page=${page}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEmployees(response.data.data);
        setTotalPages(response.data.totalPages); 
        setError(""); 
      } catch (err) {
        console.error("Error fetching employees: ", err);
        setError(err.response?.data?.message || "Failed to fetch employees.");
      }
    };

    fetchEmployees();
  }, [page, limit]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8000/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(employees.filter((employee) => employee._id !== id));
      setError(""); // Clear any previous error
    } catch (err) {
      console.error("Error deleting employee: ", err);
      setError(err.response?.data?.message || "Failed to delete employee.");
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      <h2>Employee List</h2>
      {error && <div className="error">{error}</div>}

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.position}</td>
              <td>
                <button onClick={() => handleNavigation(`/view/${employee._id}`)} className="view">
                  View
                </button>
                <button onClick={() => handleNavigation(`/edit/${employee._id}`)} className="update">
                  Edit
                </button>
                <button onClick={() => handleDelete(employee._id)} className="delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page <= 1}
          className="prev"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= totalPages}
          className="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
