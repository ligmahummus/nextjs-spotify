const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) throw new Error("Missing JWT Secret");

const jwtConfig = {
  secret: jwtSecret,
};

export default jwtConfig;
export type JwtConfig = typeof jwtConfig;
