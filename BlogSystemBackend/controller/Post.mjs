import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import fs from 'fs';
import Post from '../models/Post.mjs';
import path from 'path';


export const uploadImage = async (req, res) => {
  try {
    const { originalname, path: tempPath } = req.file;
    const extension = path.extname(originalname);
    const newPath = `${tempPath}${extension}`;
    fs.renameSync(tempPath, newPath);

    const imageUrl = `/uploads/${path.basename(newPath)}`;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Image upload failed:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

export const postPosts = async (req, res) => {
    try {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      const newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
  
      const { title, summary, content } = req.body;
  
    
      const lastPost = await Post.findOne().sort({ order: -1 });
      const newOrder = lastPost ? lastPost.order + 1 : 1; 
  
      
      const newPost = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        order: newOrder, 
      });
  
    
      res.json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

export const getPosts=async(req,res)=>{
    res.json(await Post.find().sort({ order: 1 }));
}
export const updatePost=async (req, res) => {
    try {
        const { id, title, summary, content } = req.body;

        
        let newPath = null;
        if (req.file) {
            const { originalname, path } = req.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            newPath = path + '.' + ext;
            fs.renameSync(path, newPath);
        }

        
        const updateData = {
            title,
            summary,
            content,
        };
        if (newPath) {
            updateData.cover = newPath;
        }

       
        const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
}

