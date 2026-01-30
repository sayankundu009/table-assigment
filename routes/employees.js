import express from "express";
import { fetchEmployees, createEmployee, pageChange, fetchProjects, fetchDepartments, fetchRoles, employeeCount, updateEmployee, deleteEmployee } from "../controller/employees.js";
const router = express.Router();

router.get('/', fetchEmployees);

router.get('/count', employeeCount);

router.get('/projects', fetchProjects);

router.get('/departments', fetchDepartments);

router.get('/roles', fetchRoles);

router.get('/:page', pageChange);

// Matches: POST /api/employees
router.post('/create', createEmployee);

router.patch('/update', updateEmployee);

router.delete('/delete', deleteEmployee);

export default router;