import PlaylistList from "@/app/component/playlist/PlaylistList";
import { verify } from "@/app/lib/auth/jwt/jwt.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Page = async () => {
  let payload = null;
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    if (!session || (session && !session.value)) {
      return redirect("/");
    }
    const decodedPayload = await verify(session.value);
    payload = decodedPayload.payload;
  } catch (error) {
    return redirect("/");
  }

  return (
    <main className="container mx-auto mt-12">
      <h1 className="text-4xl text-center">Manage Your Playlists</h1>
      <Suspense fallback={<div>Fetching your playlists...</div>}>
        <PlaylistList payload={payload} />
      </Suspense>
    </main>
  );
};

export default Page;
