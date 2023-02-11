import express from "express";
import Joi from "joi";

import auth from "../middleware/auth.js";
import { addNew, addList } from "../controllers/dailyAttendence.js";
import validateWith from "../middleware/JoiValidation.js";

const router = express.Router();

const registerEmployeeSchema = Joi.object({
  date: Joi.date().required(),
  in: Joi.date().required(),
  out: Joi.date().required(),
  work_hours: Joi.number().required(),
  ot_hours: Joi.number().required(),
  employee_ref: Joi.string().required(),
});

router.post("/", validateWith(registerEmployeeSchema), addNew);
router.post("/add-list", addList);

//router.post("/", auth, createPost);

export default router;
