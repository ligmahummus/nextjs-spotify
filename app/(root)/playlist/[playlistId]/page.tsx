import LoadingState from "@/app/component/navigation/LoadingState";
import DisplayPlaylist from "@/app/component/playlist/playlist-page/DisplayPlaylist";
import { getDecodedToken } from "@/app/lib/auth/auth.service";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const Page = async ({ params }: IPlaylistPage) => {
  const { playlistId } = params;

  let payload = null;

  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    if (session && session.value) {
      payload = await getDecodedToken(session.value);
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="container mx-auto mt-12">
      <Suspense fallback={<LoadingState />}>
        <DisplayPlaylist playlistId={playlistId} payload={payload} />
      </Suspense>
    </main>
  );
};

interface IPlaylistPage {
  params: { playlistId: string };
}

export default Page;
