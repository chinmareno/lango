import { SignJWT } from "jose";
import "server-only";
import { encodedSessionSecret } from "./config";

type UserTokenPayload = {
  userId: string | number;
  email: string;
};

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is not defined");
}
export const createToken = async (payload: UserTokenPayload) => {
  try {
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1 day")
      .sign(encodedSessionSecret);
    return jwt;
  } catch (error) {
    console.log("Error creating token is: ", error);
    throw new Error("Error creating token");
  }
};
