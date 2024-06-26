import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";
import { Schema } from "mongoose";

const appointmentSchema = mongoose.Schema({
  barberId: {
    type: String,
    ref: "Barber",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  whatsappNumber: {
    type: String,
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
    type: String,
    required: true,
  },
});

appointmentSchema.plugin(toJSON);

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);
