import mongoose from "mongoose";
import mongoConfig from "./mongo.config";

export default async function mongo() {
  return mongoose.connect(mongoConfig.uri);
}
