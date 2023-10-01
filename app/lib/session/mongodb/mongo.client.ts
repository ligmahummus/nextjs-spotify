import mongoose from "mongoose";
import mongoConfig from "./mongo.config";

// let mongoClientPromise: Promise<typeof mongoose>;

// if (process.env.NODE_ENV !== "production") {
//   const g: any = global;
//   let client;
//   if (!g._mongoClientPromise) {
//     client = mongoose.connect(mongoConfig.uri);
//     g._mongoClientPromise = client;
//   }

//   mongoClientPromise = g._mongoClientPromise;
// } else {
//   const client = mongoose.connect(mongoConfig.uri).then((res) => res);
//   mongoClientPromise = client;
// }

// export default mongoClientPromise;

export default async function mongo() {
  await mongoose.connect(mongoConfig.uri);
}
