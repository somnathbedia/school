import { PrismaClient } from "@prisma/client"
import { requestInterface } from "./types";
const prisma = new PrismaClient();

export const bookrequestUpdate = async (request: requestInterface, id: string) => {
    const { request_type, request_book,createdAt } = request;
    const response = await prisma.student.update({
        data: {
            request: {
                create: [
                    {
                        request_book,
                        request_type,
                        createdAt,
                    }
                ]
            }
        },
        where: {
            id: id
        }
    })

    if (response) {
        return true;
    }
    else {
        return false;
    }
}