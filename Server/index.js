import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import bodyValidation from "./middleware/bodyValidation.js";
import userRoutes from "./routes/users.js";
import employeeRoutes from "./routes/employee.js";
import attendanceRoute from "./routes/dailyAttendence.js";
import salaryRouter from "./routes/salary.js";

// Initialize app instance
const app = express();
dotenv.config();

// use some methods on above instance
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());
app.use(bodyValidation);

// Saying every routes inside postRoutes gonna start with 'user' i.e. (localhost:5000/users)
app.use("/user", userRoutes);
app.use("/employee", employeeRoutes);
app.use("/attendance", attendanceRoute);
app.use("/salary", salaryRouter);

// Put connection url directly to the code is not secure,
// At the deployment we store this con. Url in Environmental Variable for Safety
// const CONNECTION_URL =
//   "";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`DE Payroll Server running on ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// In above: after connecting to mongoose succesfully it start to listening on specified port.
