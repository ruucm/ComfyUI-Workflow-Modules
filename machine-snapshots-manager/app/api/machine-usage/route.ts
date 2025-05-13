import { NextRequest, NextResponse } from "next/server";

// Add OPTIONS handler for CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}

export async function GET(request: NextRequest) {
  const reqUrl = new URL(request.url);
  const machineName = reqUrl.searchParams.get("machineName");
  const modalSession = reqUrl.searchParams.get("modalSession");

  const url = `https://modal.com/api/workspaces/${machineName}/usage?num_cycles_ago=0`;
  const cookies = `modal-session=${modalSession};`;

  const headers = {
    accept: "application/json",
    "accept-language": "en-US,en;q=0.9",
    cookie: cookies,
    dnt: "1",
    priority: "i",
    "sec-ch-ua": '"Chromium";v="129", "Not=A?Brand";v="8"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
  };

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const data = await response.json();
  const usageInUsd = (data.totalCost * 5) / 3 || 0;

  return NextResponse.json(
    { usageInUsd },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
