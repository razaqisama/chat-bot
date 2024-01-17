import prisma from "@/lib/prisma";
import { messageHistorySchemaDELETE, messageHistorySchemaPOST } from "./schema";

export async function GET() {
  try {
    const messagesHistory = await prisma.messageHistory.findMany();

    return Response.json({ data: messagesHistory });
  } catch (err) {
    return Response.json({ err });
  }
}

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const { error } = messageHistorySchemaPOST.validate(data);

    if (error) {
      throw error;
    }

    const messageHistory = await prisma.messageHistory.create({
      data: {
        title: data.title,
      },
    });

    return Response.json({ data: messageHistory });
  } catch (err) {
    return Response.json({ err });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "";

  try {
    const { error } = messageHistorySchemaDELETE.validate({ id });

    if (error) {
      throw error;
    }

    await prisma.messageHistory.delete({
      where: {
        id,
      },
    });

    return Response.json({
      data: {
        message: `Berhasil menghapus sejarah pesan`,
      },
    });
  } catch (err) {
    return Response.json({ err });
  }
}
