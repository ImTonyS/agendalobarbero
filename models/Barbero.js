import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const barberoSchema = mongoose.Schema(
  {
  nombre: { 
    type: String, 
    required: true
   },
  duracionesCitas: { 
    type: [Number], 
    enum: [15, 30, 45], 
    required: true 
  },
  //horarios: [horarioSchema],
  //barberia: { type: Schema.Types.ObjectId, ref: 'Barberia' }
},
{
  timestamps: true,
  toJSON: { virtuals: true },
});

barberoSchema.plugin(toJSON);

export default mongoose.model.Barbero || mongoose.model("Barbero", barberoSchema);;