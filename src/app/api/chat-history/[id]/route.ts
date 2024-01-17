import prisma from "@/lib/prisma";
import { messageHistorySchemaGET } from "../schema";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const { error } = messageHistorySchemaGET.validate({ id });

    if (error) {
      throw error;
    }

    const messagesHistory = await prisma.messageHistory.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!messagesHistory) {
      throw new Error("Terdapat kesalahan");
    }

    return Response.json({ data: messagesHistory });
  } catch (err) {
    return Response.json({ err });
  }
}
