import { verify } from "@/app/lib/auth/jwt/jwt.service";
import { JWTPayload } from "@/app/lib/auth/jwt/jwt.type";
import { cookies } from "next/headers";
import Link from "next/link";
import AuthButton from "./AuthButton";
import Tooltip from "../ui/Tooltip";

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
      <Tooltip text="Click to login">
        <Link href="/api/auth">
          <AuthButton>Have an account?</AuthButton>
        </Link>
      </Tooltip>
    );
  return (
    <div className="flex items-center gap-6">
      <Link href="/playlist">Playlists</Link>
      <Tooltip text="Click to logout">
        <Link href="/api/auth/logout" prefetch={false} replace={true}>
          <AuthButton>{payload.name}</AuthButton>
        </Link>
      </Tooltip>
    </div>
  );
};

export default AuthState;
