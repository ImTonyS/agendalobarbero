import connectMongo from "@/libs/mongoose";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectMongo();
  const { id } = params;
  try {
    const appointments = await Appointment.find({ barberId: id });
    return NextResponse.json({ appointments });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
