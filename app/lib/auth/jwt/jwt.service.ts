import * as jwt from "jose";
import jwtConfig from "./jwt.config";
import { JWTPayload } from "./jwt.type";

const encodedSecret = new TextEncoder().encode(jwtConfig.secret);

export async function sign(payload: JWTPayload): Promise<string> {
  return new jwt.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(encodedSecret);
}

export async function verify(token: string): Promise<null | any> {
  try {
    return jwt.jwtVerify(token, encodedSecret);
  } catch (error) {
    return null;
  }
}
