import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";
import { Schema } from "mongoose";

const barbershopSchema = mongoose.Schema(
  {
    name: {
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
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: false,
    toJSON: { virtuals: false },
  }
);

barbershopSchema.plugin(toJSON);

export default mongoose.models.Barbershop ||
  mongoose.model("Barbershop", barbershopSchema);
