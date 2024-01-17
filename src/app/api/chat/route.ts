import prisma from "@/lib/prisma";
import {
  messageSchemaDELETE,
  messageSchemaPATCHFeedback,
  messageSchemaPOST,
} from "./schema";

export async function GET() {
  try {
    const messages = await prisma.message.findMany();
    return Response.json({ data: messages });
  } catch (err) {
    return Response.json({ err });
  }
}

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const { error } = messageSchemaPOST.validate(data);

    if (error) {
      throw error;
    }

    const messages = await prisma.message.create({
      data: {
        role: data.role,
        message: data.message,
        messageHistoryId: data.messageHistoryId,
      },
    });

    return Response.json({ data: messages });
  } catch (err) {
    return Response.json({ err });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "";

  try {
    const { error } = messageSchemaDELETE.validate({ id });

    if (error) {
      throw error;
    }

    await prisma.message.delete({
      where: {
        id,
      },
    });

    return Response.json({
      data: {
        message: `Berhasil menghapus pesan.`,
      },
    });
  } catch (err) {
    return Response.json({ err });
  }
}

export async function PATCH(request: Request) {
  const data = await request.json();

  try {
    const { error } = messageSchemaPATCHFeedback.validate(data);

    if (error) {
      throw error;
    }

    const updateMessage = await prisma.message.update({
      where: {
        id: data.id,
      },
      data: {
        feedback: data.feedback,
        ratingStatus: data.ratingStatus,
      },
    });

    return Response.json({ data: updateMessage });
  } catch (err) {
    return Response.json({ err });
  }
}
