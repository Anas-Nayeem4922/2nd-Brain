import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Content, Link, User } from "./db";
const app = express();
const port = 3000;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { auth } from "./middleware";
import { random } from './utils';

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


app.post("/content", auth, async(req : Request, res : Response) => { // Create route
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    const userId = req.userId;
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

app.get("/content", auth, async(req : Request, res) => { // Read route
    //@ts-ignore
    const userId = req.userId;
    const contents = await Content.find({
        userId
    }).populate('userId', 'username');
    res.status(200).json({
        contents
    })
});

app.put("/content/:id", auth, async(req : Request, res) => { // Update Route
    const contentId = req.params.id;
    //@ts-ignore
    const userId = req.userId;
    try{
        const content = await Content.findById(contentId);
        if(content) {
            if(userId == content.userId) {
                await Content.findByIdAndUpdate(contentId, req.body);
                res.json({
                    msg : "Content updated successfully"
                })
            }else{
                res.json({
                    msg : "You don't have access to this"
                })
            }
        }
    }
    catch(e){
        res.json({
            msg : "Invalid content id"
        })
    }
});

app.delete("/content/:id", auth, async(req : Request, res) => { // Delete Route
    const contentId = req.params.id;
    //@ts-ignore
    const userId = req.userId;
    try{
        const content = await Content.findById(contentId);
        if(content) {
            if(content.userId == userId) {
                await Content.deleteOne({
                    _id : contentId
                });
                res.json({
                    msg : "Content deleted successfully"
                })
            }else{
                res.json({
                    msg : "You don't have access to this"
                })
            }
        }
        
    }
    catch(e) {
        res.json({
            msg : "Incorrect content id"
        })
    }
});

app.post("/share", auth, async(req : Request, res) => {
    const share = req.body.share;
    if(share) {
        await Link.create({
            hash : random(10),
            //@ts-ignore
            userId : req.userId,
        })
    }else{
        await Link.deleteOne({
            //@ts-ignore
            userId : req.userId
        })
    }
});

app.get("/share/:shareLink", async(req, res) => {

})

app.get("/", (req, res) => {
    res.json({
        msg : "Home route"
    })
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})