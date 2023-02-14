import mongoose from "mongoose";

import Employee from "../models/employee.js";
import User from "../models/user.js";
import DailyAttendence from "../models/dailyAttendence.js";
import dayjs from "dayjs";

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id).populate({
      path: "user_ref",
      select: "role email",
    });
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({})
      .select("emp_id first_name last_name user_ref")
      .populate({
        path: "user_ref",
        select: "role email",
      });

    res.status(200).json({
      employees,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const prepareEmployes = async (employees, monthStart, callback) => {
  const list = [];
  employees.forEach(async (emp, index) => {
    const result = await DailyAttendence.find({
      employee_ref: emp._id,
      date: monthStart,
    });
    list.push({ name: "abc" });
  });
  callback(list);
  //return list;
};

export const getEmployees = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 5; // no of rows per page
    const startIndex = (Number(page) - 1) * LIMIT; // get the start index of the every page
    const total = await Employee.countDocuments({}); // total employees

    const employees = await Employee.find()
      .populate({
        path: "user_ref",
        select: "role email",
      })
      .sort({ _id: 1 }) //Take newest doc first
      .limit(LIMIT) // no of doc fetch
      .skip(startIndex); // ex. if we are on the page 2, we dont want to fetch first 16 employees again. so we skip those.

    res.status(200).json({
      data: employees,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEmployeesWithAttendance = async (req, res) => {
  const { page, monthStart, monthEnd } = req.query;

  try {
    const LIMIT = 5; // no of rows per page
    const startIndex = (Number(page) - 1) * LIMIT; // get the start index of the every page
    const total = await Employee.countDocuments({}); // total employees

    const employees = await Employee.find()
      .populate({
        path: "user_ref",
        select: "role email",
      })
      .sort({ _id: 1 }) //Take newest doc first
      .limit(LIMIT) // no of doc fetch
      .skip(startIndex); // ex. if we are on the page 2, we dont want to fetch first 16 employees again. so we skip those.

    // check attendance has been saved in given month
    // let empList = [];
    // if (employees) {

    // }
    // https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
    const empList = [];
    await asyncForEach(employees, async (emp, index) => {
      const result = await DailyAttendence.find({
        employee_ref: emp._id,
        date: {
          $gte: dayjs(monthStart).startOf("day"),
          $lte: dayjs(monthEnd).endOf("day"),
        },
      });
      let empObj = {
        _id: emp._id,
        emp_id: emp.emp_id,
        full_name: emp.full_name,
        first_name: emp.first_name,
        last_name: emp.last_name,
        tel: emp.tel,
        nic: emp.nic,
        address: emp.address,
        city: emp.city,
        image: emp.image,
        gender: emp.gender,
        salary: emp.salary,
        designation: emp.designation,
        date_hired: emp.date_hired,
        user_ref: emp.user_ref,
        isAttendanceSaved: result.length > 0,
        attendance: result,
      };

      // sort attendance list by date
      empObj.attendance.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });

      empList.push(empObj);
    });

    res.status(200).json({
      data: empList,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// QUERY -> /posts?page=1 -> page=1
// PARAMS -> /posts/123    -> id= 123
export const getEmployeesBySearch = async (req, res) => {
  const { search_text } = req.body;
  try {
    const employees = await Employee.find({
      $or: [
        { emp_id: { $regex: "^" + search_text, $options: "i" } },
        { first_name: { $regex: "^" + search_text, $options: "i" } },
        { last_name: { $regex: "^" + search_text, $options: "i" } },
      ],
    }).populate({
      path: "user_ref",
      select: "role email",
    });

    res.json({ data: employees });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const registerEmployee = async (req, res) => {
  const data = req.body;
  try {
    const { emp_id } = data;
    const existingEmployee = await Employee.find({ emp_id });

    if (existingEmployee.length > 0)
      return res.status(400).json({
        message: `A Employee already exists with this given Employee Code:${emp_id}`,
      });

    const employee = new Employee({
      ...data,
      user_ref: req.result._id,
      createdAt: new Date().toISOString(),
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    //Http status code: https://www.restapitutorial.com/httpstatuscodes.html
    // 409 = conflict
    res.status(409).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  const { id: _id } = req.params; // we have renamed a id to _id

  const employee = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("Employee Not Found!");

    const { employee_code } = employee;
    const existingEmployee = await Employee.find({
      employee_code: employee.employee_code,
    });

    if (existingEmployee) {
      if (existingEmployee.length < 0)
        if (existingEmployee[0]._id.toString() !== _id)
          return res.status(400).json({
            message: `A Employee already exists with this given Employee Code:${employee_code}`,
          });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      _id,
      { ...employee, _id },
      { new: true }
    );

    let existingUser = await User.findById(updatedEmployee.user_ref);

    existingUser.email = employee.email;
    await User.findByIdAndUpdate(
      existingUser._id,
      { ...existingUser },
      { new: true }
    );

    const DBemployee = await Employee.findById(_id).populate({
      path: "user_ref",
      select: "role email",
    });
    res.status(200).json(DBemployee);
    //res.status(200).json(updatedEmployee);
  } catch (error) {
    //Http status code: https://www.restapitutorial.com/httpstatuscodes.html
    // 409 = conflict
    res.status(409).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("Employee Not Found!");

    await Employee.findByIdAndDelete(_id);

    res.status(200).json({ message: "Employee Deleted Successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
