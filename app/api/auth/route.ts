import { getAuthorizationURL } from "@/app/lib/auth/auth.service";

async function authorizeLogin() {
  return Response.redirect(getAuthorizationURL(), 302);
}

export { authorizeLogin as GET };
