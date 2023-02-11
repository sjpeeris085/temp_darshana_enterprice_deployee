import mongoose from "mongoose";

const schema = mongoose.Schema({
  date: { type: Date, required: true },
  is_present: { type: Boolean, required: true },
  in: { type: Date, required: false },
  out: { type: Date, required: false },
  work_hours: { type: Number, required: true },
  ot_hours: { type: Number, required: true },
  employee_ref: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const DailyAttendence = mongoose.model("DailyAttendence", schema);

export default DailyAttendence;
