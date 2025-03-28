import { auth } from "@clerk/nextjs/server";

export async function getAuth() {
  const authData = await auth();

  if (!authData.userId) {
    throw new Error("User not found");
  }

  return authData;
}
