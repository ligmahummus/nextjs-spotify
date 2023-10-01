import { verify } from "@/app/lib/auth/jwt/jwt.service";
import { JWTPayload } from "@/app/lib/auth/jwt/jwt.type";
import { cookies } from "next/headers";
import Link from "next/link";

const AuthState = async () => {
  const cookieStore = cookies();
  const session = cookieStore.get("session");
  let payload: JWTPayload | null = null;
  if (session) {
    try {
      const decodedPayload = await verify(session.value);
      payload = decodedPayload.payload;
    } catch (error) {
      console.error(error);
    }
  }

  if (!payload)
    return (
      <Link href="/api/auth">
        <button>Have an account?</button>
      </Link>
    );
  return (
    <Link href="/api/auth/logout" prefetch={false} replace={true}>
      <button>{payload.name}</button>
    </Link>
  );
};

export default AuthState;
