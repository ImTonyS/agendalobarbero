import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Barbero from "@/models/Barbero";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
  await connectMongo();

  try {
    const { id } = params;

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
