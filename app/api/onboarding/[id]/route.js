import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Barbero from "@/models/Barbero";

export async function DELETE(req) {
  await connectMongo();

  try {
    //no esta trayendo el id del url
    const url = new URL(req.url);
    const id = url.searchParams.get("id"); // Correctly access query parameters

    const barbero = await Barbero.findOneAndUpdate(
      { _id: id },
      { activo: false },
      { new: true }
    );
    return NextResponse.json({ status: 201, data: barbero });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
