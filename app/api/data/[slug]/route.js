import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Barbershop from "@/models/Barbershop";

export async function GET(request, { params }) {
  const { slug } = params;

  if (!slug)
    return NextResponse.json({ error: "No slug provided" }, { status: 400 });

  try {
    await connectMongo();
    const barbershop = await Barbershop.findOne({ slug: slug });
    if (!barbershop) throw new Error("Barberia no encontrada");
    return NextResponse.json({ data: barbershop });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 404 });
  }
}
