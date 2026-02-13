export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const limit = searchParams.get("limit") || "5";
  const viewbox = searchParams.get("viewbox") || "";

  if (!q.trim()) {
    return Response.json({ data: [] });
  }

  const params = new URLSearchParams({
    format: "json",
    limit,
    addressdetails: "0",
    countrycodes: "in",
    q,
  });

  if (viewbox) {
    params.set("viewbox", viewbox);
    params.set("bounded", "1");
  }

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?${params.toString()}`,
    {
      headers: {
        "User-Agent": "OptiFare/1.0",
        "Accept-Language": "en",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return Response.json({ data: [] }, { status: 502 });
  }

  const data = await res.json();
  return Response.json({ data });
}
