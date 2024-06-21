import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";

import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Barber from "@/models/Barber";

// CREATES A NEW BUSINESS
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const db = await connectMongo();
  const { id } = session.user;
  const body = await req.json();
  const { name, lastname, whatsapp, hours, days } = body;

  if (!name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });

  try {
    const user = await User.findById(id);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const newBarber = new Barber({
      name: name,
      lastname: lastname,
      whatsapp: whatsapp,
      hours: hours,
      days: days,
      active: true,
      userId: new db.Types.ObjectId(id),
    });
    await newBarber.save();

    return NextResponse.json({ message: "Barber created successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
