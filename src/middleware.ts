import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// console.log(process.env.JWT_SECRET);

export const auth = (req : Request, res : Response , next : NextFunction ) => {
    const token = req.headers.token;
    next();
}