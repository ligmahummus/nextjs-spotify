type CookieSessionOptions = {
  httpOnly: boolean;
  name: string;
  maxAge: number;
  sameSite: any;
  secure: boolean;
};

export const cookieSessionOptions: CookieSessionOptions = {
  httpOnly: true,
  name: "session",
  maxAge: 60 * 60 * 24, // 1 day
  sameSite: "same-site",
  secure: process.env.NODE_ENV === "production",
};
