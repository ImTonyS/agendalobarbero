import connectMongo from "@/libs/mongoose";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";

export async function POST(req) {
  const db = await connectMongo();
  const body = await req.json();
  const { barberId, day, selectedDay, appointment } = body;

  try {
    const newAppointment = new Appointment({
      barberId: new db.Types.ObjectId(barberId),
      day: day,
      selectedDay: selectedDay,
      appointment: appointment,
      status: true,
    });
    await newAppointment.save();

    return NextResponse.json({ message: "Appointment created successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
