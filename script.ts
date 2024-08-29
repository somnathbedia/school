import { PrismaClient } from '@prisma/client'
import express from "express";
import { Request, Response } from 'express';
import bcrypt from "bcryptjs";
import { generateToken } from './tokenGenerator';
import authenticateJwt from './authenticateJwt';
import { bookrequestUpdate } from './query-methods';
import cors from "cors";

const prisma = new PrismaClient()
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());
export interface CustomRequest extends Request {
    user?: any;
}

app.post("/student/register", async (req: Request, res: Response) => {
    const { student_name, father_name, mother_name, dob, blood_group, contact_number, email, address } = req.body;
    let { password } = req.body;


    const hashedPassword = await bcrypt.hash(password, 8);
    password = hashedPassword;

    const student = await prisma.student.create({
        data: {
            student_name,
            father_name,
            mother_name,
            dob: new Date(dob),
            blood_group,
            contact_number,
            email,
            password,
            address
        }
    })

    student ? res.status(201).json({
        message: "You are registered successfully!"
    }) : res.status(500).json({
        msg: "Server error"
    })
})


app.post("/student/login", async (req: Request, res: Response) => {
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
})


app.post("/student/library/book/:id", authenticateJwt, async (req: CustomRequest, res: Response) => {
    const { request_type, request_book } = req.body;
    const studentId = req.params.id;
    let isUpdated = false;
    try {
        const request = await prisma.request.create({
            data: {
                request_type,
                request_book,
                studentId,
                createdAt: new Date()
            }
        })
       
        isUpdated = await bookrequestUpdate(request, req.user._id); 
    } catch (error) {
        res.sendStatus(500);
    }
    isUpdated ? res.status(201).json({ msg: "Book request successfull!" }) : res.end();
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
