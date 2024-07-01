import connectMongo from "@/libs/mongoose";
import Barber from "@/models/Barber";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectMongo();
  const { id } = params;

  try {
    const barbers = await Barber.find({ userId: id });

    if (barbers.length === 0)
      return NextResponse.json({ error: "Barber not found" }, { status: 404 });

    return NextResponse.json(
      {
        barber: barbers[0],
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
