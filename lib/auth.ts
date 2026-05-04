import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is not defined");

const client = new MongoClient(uri);

export const auth = betterAuth({
  database: mongodbAdapter(client.db("boighor")),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://boighor-nine.vercel.app",
    process.env.NEXT_PUBLIC_APP_URL!,
  ].filter((url): url is string => !!url),
});
