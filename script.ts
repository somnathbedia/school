import { PrismaClient } from '@prisma/client'
import express from "express";
import { Request, Response } from 'express';
import bcrypt from "bcryptjs";
import { generateToken } from './tokenGenerator';

const prisma = new PrismaClient()
const app = express();

app.use(express.json());

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




app.listen(8000, () => {
    console.log("Server is running on port 8000");
})
