import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface RequestWithUserId extends Request {
    userId ?: string;
}

export const auth = (req : RequestWithUserId, res : Response , next : NextFunction ) => {
    const token = req.headers.token;
    const decoded = jwt.verify(token as string, JWT_SECRET);
    if(decoded) {
        req.userId = (decoded as JwtPayload).id;
        next();
    }else{
        res.status(403).json({
            msg : "You are not logged-in"
        })
    }
}