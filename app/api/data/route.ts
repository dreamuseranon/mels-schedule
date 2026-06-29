import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { loadData, saveData } from "@/lib/db";
import { buildSeedData } from "@/lib/seedData";

const USER_ID = "mel";

export async function GET() {
  try {
    let data = await loadData(USER_ID);
    if (!data) {
      data = buildSeedData();
      await saveData(USER_ID, data);
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await saveData(USER_ID, body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
