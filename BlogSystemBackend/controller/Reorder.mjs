import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import fs from 'fs';
import Post from '../models/Post.mjs';
import path from 'path';

 export const Reorder=async (req, res) => {
    const { reorderedPosts } = req.body;
  
    try {
      const updatePromises = reorderedPosts.map(({ _id, order }) =>
        Post.findByIdAndUpdate(_id, { order })
      );
      await Promise.all(updatePromises);
  
      res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ message: 'Failed to update order' });
    }
  };