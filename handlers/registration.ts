import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createUser } from "../queries/student-queries";
const prisma = new PrismaClient()

const registerStudent = async(req: Request, res: Response) => {
    const { student_name, father_name, mother_name, dob, blood_group, contact_number, email, address } = req.body;
    let { password } = req.body;


    const hashedPassword = await bcrypt.hash(password, 8);
    password = hashedPassword;

    const student = await createUser({
        student_name, father_name, mother_name, dob, blood_group,
        contact_number,
        email,
        password,
        address
    })

    student ? res.status(201).json({
        message: "You are registered successfully!"
    }) : res.status(500).json({
        msg: "Server error"
    })
}

export default registerStudent;