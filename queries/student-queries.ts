import { PrismaClient } from "@prisma/client";
import { Student } from "../types";
const prisma = new PrismaClient()

export const createUser = async (student:Student) => {
    const user = await prisma.student.create({
        data:student
    })
    return user;
}