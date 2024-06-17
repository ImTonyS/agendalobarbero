import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Barbero from "@/models/Barbero";

export async function POST(req) {
  await connectMongo();

  const body = await req.json();

  if (!body.nombre) {
    return NextResponse.json({ error: "Nombre es necesario" }, { status: 400 });
  }
  try {
    const barbero = await Barbero.findOne({
      nombre: body.nombre,
      duracionesCitas: body.duracionesCitas,
    });

    if (!barbero) {
      await Barbero.create({
        nombre: body.nombre,
        duracionesCitas: body.duracionesCitas,
      });

      // Here you can add your own logic
      // For instance, sending a welcome email (use the the sendEmail helper function from /libs/mailgun)
    }

    return NextResponse.json({});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET(req) {
  await connectMongo();

  try {
    const barberos = await Barbero.find({});
    return NextResponse.json(barberos);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
