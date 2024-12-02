const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const Employee = require('../models/Employee.js');
const authMiddleware = require("../middleware/authMiddleware");


const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


const validateNumber = (value) => !isNaN(value);

router.post('/', async (req, res) => {
  const { first_name, last_name, email, position, salary, department } = req.body;

  if (email && !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (salary && !validateNumber(salary)) {
    return res.status(400).json({ message: 'Salary must be a valid number' });
  }

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee with this email already exists' });
    }

    const newEmployee = new Employee({ first_name, last_name, email, position, salary, department });
    await newEmployee.save();

    res.status(201).json({ message: 'Employee created successfully', data: newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.get('/search', async (req, res) => {
  const { position, department } = req.query;


  const filter = {};
  if (position) {
    filter.position = { $regex: position, $options: 'i' }; 
  }
  if (department) {
    filter.department = { $regex: department, $options: 'i' }; 
  }

  try {
    const employees = await Employee.find(filter);

    if (employees.length === 0) {
      return res.status(404).json({ message: 'No employees found' });
    }

    res.status(200).json({ message: 'Employees found', data: employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.get('/', authMiddleware, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const employees = await Employee.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({ message: 'Employees fetched successfully', data: employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee fetched successfully', data: employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, position, salary, department } = req.body;

  if (email && !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (salary && !validateNumber(salary)) {
    return res.status(400).json({ message: 'Salary must be a valid number' });
  }

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    Object.assign(employee, { first_name, last_name, email, position, salary, department });
    employee.updated_at = Date.now();
    await employee.save();

    res.status(200).json({ message: 'Employee updated successfully', data: employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully', data: employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
