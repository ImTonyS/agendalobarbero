import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";
import { Schema } from "mongoose";

const appointmentSchema = mongoose.Schema({
  barberId: {
    type: Schema.Types.ObjectId,
    ref: "Barber",
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  selectedDay: {
    type: String,
    required: true,
  },
  appointment: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

appointmentSchema.plugin(toJSON);

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);
