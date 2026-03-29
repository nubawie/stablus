import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { regulation, orgType, role, query, status } = await req.json();

    await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: process.env.NOTION_DB_ID },
        properties: {
          Timestamp: { date: { start: new Date().toISOString() } },
          Regulation: { rich_text: [{ text: { content: regulation || "" } }] },
          OrgType: { rich_text: [{ text: { content: orgType || "" } }] },
          Role: { rich_text: [{ text: { content: role || "" } }] },
          Query: { rich_text: [{ text: { content: (query || "").slice(0, 500) } }] },
          Status: { rich_text: [{ text: { content: status || "" } }] },
        },
      }),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
