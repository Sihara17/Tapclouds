export async function claimTCL(coins: number) {
  const res = await fetch("/api/claim", {
    method: "POST",
    body: JSON.stringify({ coins }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error("Gagal klaim koin")
  }

  return await res.json()
}
