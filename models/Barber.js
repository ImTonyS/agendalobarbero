import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";
import { Schema } from "mongoose";

const barberSchema = mongoose.Schema(
  //TODO: Fix the schema, days and hours squeleton
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    whatsapp: {
      type: {
        number: { type: String, required: true },
        country: { type: String, required: true },
        numberFull: { type: String, required: true },
      },
      required: true,
    },
    days: {
      monday: { type: Boolean, required: true },
      tuesday: { type: Boolean, required: true },
      wednesday: { type: Boolean, required: true },
      thursday: { type: Boolean, required: true },
      friday: { type: Boolean, required: true },
      saturday: { type: Boolean, required: true },
      sunday: { type: Boolean, required: true },
    },
    hours: {
      type: [
        {
          day: { type: String, required: true },
          intervals: [
            {
              start: { type: String, required: true },
              end: { type: String, required: true },
            },
          ],
        },
      ],
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: false,
    toJSON: { virtuals: false },
  }
);

barberSchema.plugin(toJSON);

export default mongoose.models.Barber || mongoose.model("Barber", barberSchema);