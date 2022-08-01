import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

import { UserDocument } from "./user.model";
interface base {
  user: UserDocument["_id"];
  valid: string;
}
export interface SchemaDocument extends base, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    valid: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model<UserDocument>("Session", sessionSchema);

export default SessionModel;
