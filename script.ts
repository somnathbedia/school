import { PrismaClient } from '@prisma/client'
import express from "express";
import { Request, Response } from 'express';
import authenticateJwt from './authenticateJwt';
import cors from "cors";
import registerStudent from './handlers/registration';
import studentLogin from './handlers/login';

const prisma = new PrismaClient()
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());
export interface CustomRequest extends Request {
    user?: any;
}

app.post("/student/register", registerStudent)


app.post("/student/login", studentLogin)


app.post("/student/library/book", authenticateJwt, async (req: CustomRequest, res: Response) => {
    const { request_type, request_book } = req.body;
    const studentId = req.user._id;
    let isUpdated = false;
    try {
        const request = await prisma.request.create({
            data: {
                request_type,
                request_book,
                studentId,
                createdAt: new Date()
            },
        })
        request ? res.status(201).json({ msg: "Book request successfull!" }) : res.end();
    } catch (error) {
        res.sendStatus(500);
    }
    
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
