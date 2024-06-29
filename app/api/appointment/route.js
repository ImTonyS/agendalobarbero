import connectMongo from "@/libs/mongoose";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";

export async function POST(req) {
  const db = await connectMongo();
  const body = await req.json();
  const {
    barberId,
    day,
    selectedDay,
    appointment,
    name,
    lastname,
    whatsappNumber,
  } = body;

  try {
    const newAppointment = new Appointment({
      barberId: barberId,
      day: day,
      selectedDay: selectedDay,
      appointment: appointment,
      name: name,
      lastname: lastname,
      whatsappNumber: whatsappNumber,
      status: "Pendiente",
    });
    await newAppointment.save();

    return NextResponse.json({ message: "Appointment created successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
