export async function fetchPairs(search?: string) {
  const url = process.env.NEXT_PUBLIC_API_BASE + 
    "/api/pairs" + (search ? `?search=${encodeURIComponent(search)}` : "");
  const res = await fetch(url, { next: { revalidate: 10 } });
  return res.json();
}

export async function fetchPair(id: string) {
  const url = process.env.NEXT_PUBLIC_API_BASE + `/api/pairs/${id}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Not found");
  return res.json();
}
