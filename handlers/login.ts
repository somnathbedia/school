import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient()
import { generateToken } from '../tokenGenerator';

const studentLogin = async (req:Request,res:Response) => {
    const { email, password } = req.body;

    const User = await prisma.student.findUnique({
        where: {
            email,
        }
    });


    if (User) {
        const storedPassword = User?.password;

        bcrypt.compare(password, storedPassword, (err, success) => {
            if (err || !success) {
                res.status(401).json({ msg: "Unautorized" });
                return;
            }

            const token = generateToken({ _id: User.id, email: User.email });
            res.json({ msg: "Student logged in successfully!", token });
            return;

        })
    }
    else {
        return res.status(404).json({ msg: "User not found" });
    }
}

export default studentLogin;