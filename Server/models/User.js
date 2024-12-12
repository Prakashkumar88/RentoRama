// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   email: { type: String, required: true, trim: true, unique: true, lowercase: true },
//   password: { type: String, required: true, trim: true },
//   is_verified: { type: Boolean, default: false },
//   roles: { type: [String], enum: ["user", "admin"], default: ["user"] },
// })

// // Model
// const UserModel = mongoose.model("user", userSchema)

// export default UserModel

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  surname: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, trim: true },
  profileImage: { type: String, trim: true },
  dob: { type: Date, required: true },
  phoneNumber: { type: String, required: true, unique: true, trim: true },
  drivingLicense: { type: String, required: true, trim: true },
  aadhaarCard: { type: String, required: true, trim: true },
  agreed: { type: Boolean, required: true },
  is_verified: { type: Boolean, default: false },
  roles: { type: [String], enum: ["user", "admin"], default: ["user"] }
});

// Model
const UserModel = mongoose.model("user", userSchema);

export default UserModel;
