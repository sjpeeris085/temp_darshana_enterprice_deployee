import mongoose from "mongoose";
import dayjs from "dayjs";

import Employee from "../models/employee.js";
import User from "../models/user.js";
import DailyAttendence from "../models/dailyAttendence.js";

export const addNew = async (req, res) => {
  const data = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(data.employee_ref))
      return res.status(404).send("Employee Not Found!");

    await DailyAttendence.deleteOne({
      date: data.date,
      employee_ref: data.employee_ref,
    });

    const newAttendance = new DailyAttendence({ ...data });

    await newAttendance.save();
    return res.status(201).json(newAttendance);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const addList = async (req, res) => {
  const { data, employee_ref, year, month } = req.body;

  try {
    const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();
    const monthStart = dayjs(`${year}-${month}-01`).format("YYYY-MM-DD");
    const monthEnd = dayjs(`${year}-${month}-${daysInMonth}`).format(
      "YYYY-MM-DD"
    );

    // Delete OLd Attendance Records
    //lte less than or equal
    //gte greater than or equal
    await DailyAttendence.deleteMany({
      date: {
        $gte: monthStart,
        $lte: monthEnd,
      },
      employee_ref: employee_ref,
    });

    const atList = [];
    data.map((item) => {
      const newAttendance = new DailyAttendence({
        ...item,
        employee_ref: employee_ref,
      });
      atList.push(newAttendance);
    });

    await DailyAttendence.create(atList);

    return res.status(201).json({ message: "Successfully saved" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
