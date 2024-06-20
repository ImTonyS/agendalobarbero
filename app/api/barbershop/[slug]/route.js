import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";

import connectMongo from "@/libs/mongoose";
import Barbershop from "@/models/Barbershop";
// Gets a business using slug
export async function GET(request, { params }) {
  const { slug } = params;
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  if (!slug)
    return NextResponse.json({ error: "No slug provided" }, { status: 400 });

  try {
    await connectMongo();
    const barbershop = await Barbershop.findOne({ slug });
    if (!barbershop) return NextResponse.json({ available: true });
    return NextResponse.json({ available: false });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
