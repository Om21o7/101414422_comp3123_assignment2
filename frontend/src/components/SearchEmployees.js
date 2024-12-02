import React, { useState } from "react";
import axios from "axios";

const SearchEmployees = () => {
  const [query, setQuery] = useState({
    position: "",
    department: "",
  });
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
  
    if (!query.position.trim() && !query.department.trim()) {
      setError("Please fill in at least one field to perform a search.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/employees/search", {
        params: query,
      });
      if (response.data.data.length === 0) {
        setError("No employees found.");
      } else {
        setResults(response.data.data);
        setError(""); 
      }
    } catch (error) {
      setError("An error occurred while searching for employees.");
    }
  };

  return (
    <><div>
      <h2>Search Employees</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={query.position}
          onChange={handleChange} />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={query.department}
          onChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      {error && <div className="error">{error}</div>}
      <ul>
        {results.map((employee) => (
          <li key={employee._id}>
            {employee.first_name} {employee.last_name} - {employee.position}
          </li>
        ))}
      </ul>
    </div><button onClick={() => window.location.replace("/employees")}>Back</button></>
  );
};

export default SearchEmployees;
