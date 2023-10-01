export const cookieSessionOptions = {
  httpOnly: true,
  path: "/",
  name: "session",
  secure: process.env.NODE_ENV === "production",
};
