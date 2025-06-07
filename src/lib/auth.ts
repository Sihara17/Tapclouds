// Mock auth implementation
export const auth = async () => {
  return {
    user: {
      id: "1",
      name: "Player",
      email: "player@example.com",
    },
  }
}

export const handlers = {
  GET: async () => {
    return new Response("OK")
  },
  POST: async () => {
    return new Response("OK")
  },
}
