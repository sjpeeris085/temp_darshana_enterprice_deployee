import mongoose from "mongoose";

// Schema is a format for document (table) ( define attributes have to)
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  is_email_verified: { type: Boolean, required: false, default: false },
  email_verification_code: { type: String, required: true },
});

//Convet above schema in to model and then finally we export it.
const User = mongoose.model("User", userSchema);

export default User;
