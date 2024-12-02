import React, { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios"; 

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8000/employees/${id}`, employee, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/employees");
    } catch (error) {
      console.error("Error updating employee:", error);
      setError("Error updating employee");
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="first_name" value={employee.first_name || ""} onChange={handleChange} required />
        <br />
        <label>Last Name:</label>
        <input type="text" name="last_name" value={employee.last_name || ""} onChange={handleChange} required />
        <br />
        <label>Email:</label>
        <input type="email" name="email" value={employee.email || ""} onChange={handleChange} required />
        <br />
        <label>Position:</label>
        <input type="text" name="position" value={employee.position || ""} onChange={handleChange} required />
        <br />
        <label>Salary:</label>
        <input type="number" name="salary" value={employee.salary || ""} onChange={handleChange} />
        <br />
        <label>Department:</label>
        <input type="text" name="department" value={employee.department || ""} onChange={handleChange} />
        <br />
        <button type="submit">Save Changes</button>
        <button onClick={() => navigate("/employees")}>Cancel</button>
      </form>
    </div>
  );
};

export default EditEmployee;
