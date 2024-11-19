import { model, Schema, Types } from "mongoose";


const userSchema = new Schema({
    username : {type : String, unique : true, required : true},
    email : {type : String, unique : true, required : true},
    password : {type : String, required : true},
})

export const User = model("User", userSchema);

const contentTypes = ['image', 'video', 'article', 'audio'];

const contentSchema = new Schema({
    link : {type : String, required : true},
    type : {type : String, enum : contentTypes, required : true},
    title : {type : String, required : true},
    tags : [{type : Types.ObjectId, ref : 'Tag'}],
    userId : {type : Types.ObjectId, ref : 'User'}
});

export const Content = model("Content", contentSchema);

const tagSchema = new Schema({
    title : {type : String, required : true, unique : true}
})

export const Tag = model("Tag", tagSchema);

const linkSchema = new Schema({
    hash : {type : String, required : true},
    userId : {type : Types.ObjectId, ref : 'User'}
})

export const Link = model("Link", linkSchema);