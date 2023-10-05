import { cookies } from "next/headers";
import { verify } from "./app/lib/auth/jwt/jwt.service";
import { JWTPayload } from "./app/lib/auth/jwt/jwt.type";
import { NextRequest, NextResponse } from "next/server";

const forbiddenPaths = ["/playlist"];

export default async function middleware(request: NextRequest) {
  let isAuthed = false;
  const cookieStore = cookies();
  const session = cookieStore.get("session");

  if (session) {
    try {
      const decodedToken: JWTPayload = await verify(session.value);
      (request as any).spotifyId = (decodedToken as any).payload.spotifyId;
      isAuthed = true;
    } catch (e) {}
  }

  if (forbiddenPaths.includes(request.nextUrl.pathname)) {
    if (!isAuthed) {
      return NextResponse.redirect(request.nextUrl.origin);
    }
  }

  return NextResponse.next();
}
