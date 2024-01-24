import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getAllUsers() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const users = await prisma.user.findMany();

    const formattedUsers = users.map((user) => ({
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt : user.updatedAt.toISOString(),
        emailVerified:user.emailVerified?.toISOString() || null
        
        // Adjust the field name based on your actual data structure
        // Add more fields if necessary
      }));
  
      return formattedUsers;
  } catch (error: any) {
    return null;
  }
}
