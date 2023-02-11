import mongoose from "mongoose";

// Schema is a format for document (table) ( define attributes have to)

const employeeSchema = mongoose.Schema({
  emp_id: { type: String, required: true },
  full_name: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  tel: { type: String, required: false },
  nic: { type: String, required: true },
  address: { type: String, required: false },
  city: { type: String, required: false },
  image: { type: String, required: false },
  gender: { type: String, required: true },
  salary: { type: Number, required: true },
  designation: { type: String, required: true },
  date_hired: { type: Date, required: true },
  user_ref: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

//Convet above schema in to model and then finally we export it.

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
