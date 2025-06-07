export async function claimTCL(coins: number) {
  const res = await fetch("/api/claim", {
    method: "POST",
    body: JSON.stringify({ coins }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error("Failed to claim coins")
  }

  return await res.json()
}
