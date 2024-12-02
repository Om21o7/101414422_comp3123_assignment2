import React from 'react';
import CreateEmployee from '../components/CreateEmployee';  
import EmployeeList from '../components/EmployeeList';    

const EmployeeManagementPage = () => {
  return (
    <div>
      <h1>Employee Management</h1>
      <EmployeeList /> 
      <CreateEmployee />  
      
    </div>
  );
};

export default EmployeeManagementPage;
