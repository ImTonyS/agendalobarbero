import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Barbero from "@/models/Barbero";
import { ObjectId } from "mongodb";

export async function DELETE(req) {
  await connectMongo();

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id"); // Correctly access query parameters

    const barbero = await Barbero.findOneAndUpdate(
      { id: id },
      { activo: false },
      { new: true }
    );

    console.log(barbero);
    return NextResponse.json({ status: 201, data: barbero });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
