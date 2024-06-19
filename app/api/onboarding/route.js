import connectMongo from "@/libs/mongoose";
import Barbero from "@/models/Barbero";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";

export async function POST(req) {
  await connectMongo();

  const body = await req.json();

  if (!body.nombre) {
    return NextResponse.json({ error: "Nombre es necesario" }, { status: 400 });
  }
  const session = await getServerSession(authOptions);

  try {
    const barbero = await Barbero.findOne({
      nombre: body.nombre,
      apellido: body.apellido,
      email: body.email,
      user: session.user.id,
    });

    if (!barbero) {
      await Barbero.create({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        userId: session.user.id,
      });

      // Here you can add your own logic
      // For instance, sending a welcome email (use the the sendEmail helper function from /libs/mailgun)
    }
    return NextResponse.json({ status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET(req) {
  await connectMongo();
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  try {
    const barberos = await Barbero.find({ userId: userId });
    return NextResponse.json(barberos);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
