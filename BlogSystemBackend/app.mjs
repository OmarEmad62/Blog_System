import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import multer from "multer";
import Post from './models/Post.mjs';
import fs from 'fs';
import dotenv from "dotenv";
import connectDB from "./config/database.mjs";
import postsRouter from "./routes/Post.mjs";
import path from 'path';

import { fileURLToPath } from 'url';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const uploadMiddleware=multer({dest:'uploads/'});

// connection to mongo
connectDB()
app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads',express.static(__dirname + '/uploads'));
//Routess
app.post('/upload', uploadMiddleware.single('file'), (req, res) => {
  const filePath = `http://localhost:4000/uploads/${req.file.filename}`;
  res.json({ url: filePath });
});
app.use('/post',postsRouter)
app.listen(4000, () => {
    console.log("Listening on port 4000");
});