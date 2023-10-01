const mongoURI = process.env.MONGO_URI;

if (!mongoURI) throw new Error("Missing Mongo URI");

const mongoConfig = {
  uri: mongoURI,
  db: "spotify-session",
};

export default mongoConfig;
export type MongoConfig = typeof mongoConfig;
