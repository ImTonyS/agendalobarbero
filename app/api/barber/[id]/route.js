import Barber from "@/models/Barber";
import connectMongo from "@/libs/mongoose";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await connectMongo();

  const { id } = params;

  try {
    await Barber.findOneAndUpdate(
      { _id: id },
      { active: false },
      { new: true }
    );

    return NextResponse.json({
      message: "Barber deleted",
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
