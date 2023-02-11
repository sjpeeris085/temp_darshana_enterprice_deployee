import express from "express";
import Joi from "joi";

import auth from "../middleware/auth.js";
import { getSalarySlipPDF, save } from "../controllers/salary.js";
import validateWith from "../middleware/JoiValidation.js";

const router = express.Router();

const salarySchema = Joi.object({
  emp_id: Joi.string().required(),
  year: Joi.number().required(),
  month: Joi.number().required(),
  basic_salary: Joi.number().required(),
  present_days: Joi.number().required(),
  absent_days: Joi.number().required(),
  day_hours: Joi.number().required(),
  normal_ot: Joi.number().required(),
  earnings_for_normal_ot: Joi.number().required(),
  sunday_ot: Joi.number().required(),
  earnings_for_sunday_ot: Joi.number().required(),
  deduct_for_absent: Joi.number().required(),
  deduct_for_advance: Joi.number().required(),
  allowance: Joi.number().required(),
  total_earnings: Joi.number().required(),
  net_salary: Joi.number().required(),
  user_ref: Joi.string().required(),
});

router.post("/save", validateWith(salarySchema), save);
router.get("/get-paysheet", getSalarySlipPDF);

//router.post("/", auth, createPost);

export default router;
