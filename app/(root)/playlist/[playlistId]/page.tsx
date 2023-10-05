import { getDecodedToken } from "@/app/lib/auth/auth.service";
import { getPlaylistTracks } from "@/app/lib/spotify/spotify.service";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const Page = async ({ params }: IPlaylistPage) => {
  const { playlistId } = params;

  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    if (session && session.value) {
      const decodedPayload = await getDecodedToken(session.value);
      const response = await getPlaylistTracks(decodedPayload, playlistId);
      if (response.error) throw new Error();
      console.log("🚀 ~ file: page.tsx:17 ~ Page ~ response:", response);
    }
  } catch (error) {
    notFound();
  }

  return <main className="container mx-auto mt-12">{playlistId}</main>;
};

interface IPlaylistPage {
  params: { playlistId: string };
}

export default Page;
