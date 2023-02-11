import express from "express";
import Joi from "joi";

import {
  getEmployee,
  getEmployees,
  getEmployeesWithAttendance,
  getAllEmployees,
  getEmployeesBySearch,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.js";
import { createUser } from "../controllers/user.js";

import auth from "../middleware/auth.js";
import validateWith from "../middleware/JoiValidation.js";

const router = express.Router();

const registerEmployeeSchema = Joi.object({
  role: Joi.string().required(),
  emp_id: Joi.string().required(),
  full_name: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  tel: Joi.string(),
  email: Joi.string().email().required(),
  nic: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  image: Joi.any(),
  gender: Joi.string().required(),
  salary: Joi.number().required(),
  designation: Joi.string().required(),
  date_hired: Joi.string().required(),
});

/*
// router.get(param_1, param_2);
// param_1 : route name
// param_2 : call back function that executed once user visit this route
// all callback functions has req and res params


router.get("/", (req, res) => {
  res.send("THIS WORKS!");
});

we move this callback function to controller
that way we can separate routes and its handelters
*/

router.get("/all", getAllEmployees);
router.get("/", getEmployees);
router.get("/get-with-attendance", getEmployeesWithAttendance);
router.get("/:id", getEmployee);
router.post(
  "/create-account",
  validateWith(registerEmployeeSchema),
  createUser,
  registerEmployee
);
router.patch("/:id", updateEmployee);
router.post("/search", getEmployeesBySearch);
router.delete("/delete/:id", deleteEmployee);

// router.post("/", auth, createPost);

export default router;
