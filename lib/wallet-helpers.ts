import crypto from "crypto"

export const hashNonce = ({ nonce }: { nonce: string }) => {
  const hmac = crypto.createHmac("sha256", process.env.NEXTAUTH_SECRET!)
  hmac.update(nonce)
  return hmac.digest("hex")
}

export const getNewNonces = async () => {
  const nonce = crypto.randomUUID().replace(/-/g, "")
  const signedNonce = hashNonce({ nonce })
  return {
    nonce,
    signedNonce,
  }
}
