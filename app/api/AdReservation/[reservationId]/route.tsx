import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

interface IParams {
  reservationId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid reservation ID');
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
    },
  });

  return NextResponse.json(reservation);
}
