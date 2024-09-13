import mongoose, { Schema } from "mongoose";

const usersChema = new Schema({
  name: {
    type: String,
    require: [true, "Name Is Required"],
  },
  email: {
    type: String,
    require: [true, "Email Is Required"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Password Is Required"],
  },
  img: {
    type: String,
  },
  roles: {
    type: [String],
    default: ["USER_ROLE"],
    enum: ["USER_ROLE", "ADMIN_ROLE"],
  },
});

export const UserModel = mongoose.model("User", usersChema);
