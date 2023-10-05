import { Schema, model, models } from "mongoose";

const sessionSchema = new Schema(
  {
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    spotifyId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SessionModel =
  (models && models.Session) || model("Session", sessionSchema);

export default SessionModel;
