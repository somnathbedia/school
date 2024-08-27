import Jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

const options: SignOptions = {
    expiresIn: '1h',
    algorithm: 'HS256',
};


export const generateToken = (payload: Object) => {
    const expires = '1h';
    const secret: string = process.env.SECRET_KEY || "3ecretkey";

    const token = Jwt.sign(payload, secret, options);

    return token;
}

