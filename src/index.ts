import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request } from "express";
import mongoose from "mongoose";
import { Content, User } from "./db";
const app = express();
const port = 3000;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { auth } from "./middleware";

const JWT_SECRET = process.env.JWT_SECRET as string;
const MONGO_URL = process.env.MONGO_URL as string;

app.use(express.json());

main()
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);

}

app.post("/signup", async (req, res) => {
    const username : string = req.body.username;
    const email : string = req.body.email;
    const password : string = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 3);
    try { 
        await User.create({
            username,
            email,
            password : hashedPassword
        })
        res.status(200).json({
            msg : "Successfully signed-up"
        })
    }catch(e) {
        res.status(411).json({
            msg : "User already exists with this username"
        })
    }
})

app.post("/signin", async (req, res) => {
    const email : string = req.body.email;
    const password : string = req.body.password;
    const foundUser = await User.findOne({
        email
    });
    if(foundUser) {
        const user = await bcrypt.compare(password, foundUser.password);
        if(user) {
            const token = jwt.sign({
                id : foundUser._id
            }, JWT_SECRET);
            res.status(200).json({
                msg : "You are successfully signed-in",
                token
            })
        }else{
            res.status(403).json({
                msg : "Incorrect password"
            })
        }
    }else{
        res.status(403).json({
            msg : "Incorrect e-mail"
        })
    }
})

interface CustomRequest extends Request {
    userId ?: string
}


app.post("/content", auth, async(req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    const userId = (req as CustomRequest).userId;
    await Content.create({
        link,
        type,
        title,
        tags : [],
        userId
    });
    res.status(200).json({
        msg : "Content added"
    })
});

app.get("/content", auth, async(req, res) => {
    const userId = (req as CustomRequest).userId;
    const contents = await Content.find({
        userId
    }).populate('userId', 'username');
    res.status(200).json({
        contents
    })
})

app.get("/", (req, res) => {
    res.json({
        msg : "Home route"
    })
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})