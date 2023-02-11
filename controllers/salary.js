import mongoose from "mongoose";
import pdf from "html-pdf";
import dayjs from "dayjs";

import Employee from "../models/employee.js";
import User from "../models/user.js";
import Salary from "../models/salary.js";
import paysheetTemplate from "../service/paysheetTemplate.js";

export const save = async (req, res) => {
  const data = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(data.user_ref))
      return res.status(404).send("Employee Not Found!");

    //Delete old record
    await Salary.deleteOne({
      year: data.year,
      month: data.month,
      user_ref: data.user_ref,
    });

    const newSalary = new Salary({ ...data });
    await newSalary.save();

    return res.status(201).json(newSalary);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//PDF
export const getSalarySlipPDF = async (req, res) => {
  // QUERY -> /posts?page=1 -> page=1   [req.query]
  // PARAMS -> /posts/123    -> id= 123  [req.params]
  const { month, year, emp_id } = req.query;
  try {
    //check tea rate
    const salary = await Salary.findOne({
      year,
      month,
      emp_id,
    });
    if (!salary)
      return res
        .status(404)
        .json({ message: "Salary has not saved for given month, employee" });

    const employee = await Employee.findOne({
      emp_id: emp_id,
    });

    var options = { format: "A4" };

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthName = monthNames.at(month - 1);

    pdf
      .create(paysheetTemplate({ salary, monthName, employee }), options)
      .toStream(function (err, stream) {
        if (err) return res.send(err);

        res.setHeader("Content-Type", "application/pdf");
        // res.setHeader("Content-Disposition", "attachment;filename=invoice.pdf");
        // res.setHeader("Content-Disposition", "application;filename=invoice.pdf");
        res.setHeader("Content-Disposition", "inline;filename=invoice.pdf");
        res.type("pdf");
        stream.pipe(res);
      });

    //Ref Docs:
    // 1) https://www.npmjs.com/package/html-pdf?activeTab=readme
    // 2) https://www.npmjs.com/package/html-pdf-node
    // 3) https://stackoverflow.com/questions/31264629/download-generated-pdf-using-node-html-pdf-module/31694920#31694920

    /*
pdf.create(pdfTemplate(), options).toBuffer(function (err, buffer) {
  if (err) return res.send(err);
  var options = { format: "A4" };

  res.setHeader("Content-Type", "application/pdf");
  // res.setHeader("Content-Disposition", "attachment;filename=invoice.pdf");
  // res.setHeader("Content-Disposition", "application;filename=invoice.pdf");
  res.setHeader("Content-Disposition", "inline;filename=invoice.pdf");
  res.type("pdf");
  res.end(buffer, "binary");
});

*/
    //  OR

    // pdf.create(teaBillTemplate(), options).toStream(function (err, stream) {
    //   if (err) return res.send(err);
    //   var options = { format: "A4" };

    //   res.setHeader("Content-Type", "application/pdf");
    //   // res.setHeader("Content-Disposition", "attachment;filename=invoice.pdf");
    //   // res.setHeader("Content-Disposition", "application;filename=invoice.pdf");
    //   res.setHeader("Content-Disposition", "inline;filename=invoice.pdf");
    //   res.type("pdf");
    //   stream.pipe(res);
    // });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
