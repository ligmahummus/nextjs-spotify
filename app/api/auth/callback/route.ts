import { implementLogin } from "@/app/lib/auth/auth.service";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { cookieSessionOptions } from "@/app/lib/session/session.config";

async function callbackHandler(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get("code");
    const error = request.nextUrl.searchParams.get("error");
    if (!code || error) {
      return Response.redirect(request.nextUrl.origin);
    }

    const cookieStore = cookies();
    const jwt = await implementLogin(code);
    cookieStore.set("session", jwt, cookieSessionOptions);

    return Response.redirect(request.nextUrl.origin);
  } catch (error) {
    console.log(error);
    return Response.redirect(request.nextUrl.origin);
  }
}

export { callbackHandler as GET };
