import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";

import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Barbershop from "@/models/Barbershop";

// CREATES A NEW BUSINESS
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const db = await connectMongo();
  const { id } = session.user;
  const body = await req.json();
  const { name, whatsapp, slug } = body;

  if (!name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });

  try {
    const existingBarbershop = await Barbershop.findOne({
      userId: new db.Types.ObjectId(id),
    });
    if (existingBarbershop) {
      return NextResponse.json(
        {
          error: "Ya tienes un negocio creado. Solo puedes tener un negocio.",
        },
        { status: 500 }
      );
    }

    const user = await User.findById(id);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const newBarbershop = new Barbershop({
      name: name,
      whatsapp: whatsapp,
      slug: slug,
      userId: new db.Types.ObjectId(id),
    });
    await newBarbershop.save();

    return NextResponse.json({ message: "Barbershop created successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
