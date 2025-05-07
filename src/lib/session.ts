import { SignJWT } from "jose";
import "server-only";

type UserTokenPayload = {
  userId: string | number;
  email: string;
};

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is not defined");
}
const encodedSecret = new TextEncoder().encode(process.env.SESSION_SECRET);
export const createToken = async (payload: UserTokenPayload) => {
  try {
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1 day")
      .sign(encodedSecret);
    return jwt;
  } catch (error) {
    console.log("Error creating token is: ", error);
    throw new Error("Error creating token");
  }
};
