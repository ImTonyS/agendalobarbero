import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const barberoSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowcase: true,
      trim: true,
      required: true,
    },
    duracionesCitas: {
      type: Number,
      enum: [15, 30, 45],
    },
    //horarios: [horarioSchema],
    //barberia: { type: Schema.Types.ObjectId, ref: 'Barberia' }
  },
  {
    timestamps: false,
    toJSON: { virtuals: false },
  }
);

barberoSchema.plugin(toJSON);

export default mongoose.models.Barbero ||
  mongoose.model("Barbero", barberoSchema);
