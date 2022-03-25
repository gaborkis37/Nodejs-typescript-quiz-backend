import { Schema, model, Model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  recentScore: number;
  allTimeScore: number;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  recentScore: { type: Number, default: 0 },
  allTimeScore: { type: Number, default: 0 },
});

export const User: Model<IUser> = model("User", UserSchema);
