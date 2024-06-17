import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Barbero from "@/models/Barbero";

// This route is used to store the leads that are generated from the landing page.
// The API call is initiated by <ButtonLead /> component
// Duplicate emails just return 200 OK
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
