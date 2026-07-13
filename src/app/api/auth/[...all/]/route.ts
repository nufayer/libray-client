import { NextRequest } from "next/server";

const AUTH_SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function handler(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.pathname.replace("/api/auth", "");
  const targetUrl = `${AUTH_SERVER_URL}/api/auth${path}${url.search}`;

  const response = await fetch(targetUrl, {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
      Cookie: request.headers.get("cookie") || "",
    },
    body: request.method !== "GET" && request.method !== "HEAD" ? await request.text() : undefined,
    credentials: "include",
  });

  const data = await response.arrayBuffer();
  
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("transfer-encoding");

  return new Response(data, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export { handler as GET, handler as POST };