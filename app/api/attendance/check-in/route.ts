import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.text();
    const response = await fetch(
      "http://a2.4000063966.com:81/iclock/cdata?SN=CJDE193560303&table=ATTLOG&Stamp=666",
      {
        method: 'POST',
        headers: {
          'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
          'Content-Type': 'text/plain',
        },
        body: data,
      }
    );

    const result = await response.text();
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to check in' },
      { status: 500 }
    );
  }
}