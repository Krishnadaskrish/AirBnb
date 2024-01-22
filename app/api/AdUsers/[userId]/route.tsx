import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

interface IParams {
  userId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { userId } = params;

  if (! userId || typeof  userId !== 'string') {
    throw new Error('Invalid userId');
  }

  const reservation = await prisma.user.deleteMany({
    where: {
      id:  userId,
    },
  });

  return NextResponse.json(reservation);
}
