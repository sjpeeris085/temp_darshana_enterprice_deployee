import mongoose from "mongoose";

// Schema is a format for document (table) ( define attributes have to)

const salarySchema = mongoose.Schema({
  emp_id: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  basic_salary: { type: Number, required: true },
  present_days: { type: Number, required: true },
  absent_days: { type: Number, required: true },
  day_hours: { type: Number, required: true },
  normal_ot: { type: Number, required: true },
  earnings_for_normal_ot: { type: Number, required: true },
  sunday_ot: { type: Number, required: true },
  earnings_for_sunday_ot: { type: Number, required: true },
  deduct_for_absent: { type: Number, required: true },
  deduct_for_advance: { type: Number, required: true },
  allowance: { type: Number, required: true },
  total_earnings: { type: Number, required: true },
  net_salary: { type: Number, required: true },
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

const Salary = mongoose.model("Salary", salarySchema);

export default Salary;
