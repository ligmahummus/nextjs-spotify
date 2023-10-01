import { verify } from "@/app/lib/auth/jwt/jwt.service";
import { SpotifySession } from "@/app/lib/session/session.service";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

async function logout(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get("session");

    if (sessionCookie && sessionCookie.value) {
      const decodedJwt = await verify(sessionCookie.value);
      const session = new SpotifySession(decodedJwt.payload.spotifyId);
      session.destroy();
    }

    cookieStore.delete("session");
    return Response.redirect(request.nextUrl.origin, 302);
  } catch (error) {
    console.log(error);
    return Response.redirect(request.nextUrl.origin, 302);
  }
}

export { logout as GET };
