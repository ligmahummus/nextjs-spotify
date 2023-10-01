import SessionModel from "./mongodb/schems/session.schema";
import { User } from "./session.type";

export class SpotifySession {
  private spotifyId: string;

  constructor(spotifyId: string) {
    this.spotifyId = spotifyId;
    if (!this.spotifyId) {
      throw new Error("Spotify ID is required");
    }
  }

  async getCurrentUser(): Promise<any> {
    return await SessionModel.exists({ spotifyId: this.spotifyId });
  }

  async destroy(): Promise<void> {
    await SessionModel.findOneAndDelete({ spotifyId: this.spotifyId });
  }

  async updateAccessToken(accessToken: string): Promise<void> {
    await SessionModel.findByIdAndUpdate(this.spotifyId, {
      accessToken,
    });
  }

  async login(newSession: Omit<User, "_id">): Promise<any> {
    try {
      const isUserExists = await this.getCurrentUser();
      if (!isUserExists) {
        const session = new SessionModel(newSession);
        return await session.save({ validateBeforeSave: true, new: true });
      } else {
        console.log(`User \"${this.spotifyId}\" was updated`);
        return await SessionModel.findOneAndUpdate(
          { spotifyId: this.spotifyId },
          newSession,
          {
            new: true,
          }
        );
      }
    } catch (error) {
      throw new Error(error as any);
    }
  }
}
