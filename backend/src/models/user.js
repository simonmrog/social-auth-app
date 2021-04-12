"use strict"

import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  provider: String,
  providerId: { type: String, unique: true },
  photo: String,
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("User", UserSchema);
