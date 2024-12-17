import {Router} from "express";
import multer from "multer";
import{postPosts,getPosts,updatePost,uploadImage} from "../controller/Post.mjs"
import{getPost,deletePost} from "../controller/singlePost.mjs"
import{Reorder}from "../controller/Reorder.mjs"
const routers=Router();
const uploadMiddleware=multer({dest:'uploads/'});
//routers.use('/uploads',express.static(__dirname + '/uploads'));
routers.get('/',getPosts);
routers.post('/',uploadMiddleware.single('file'),postPosts);
routers.put('/', uploadMiddleware.single('file'),updatePost);
routers.get('/:id', getPost);
routers.delete('/:id',deletePost);
routers.put('/reorder',Reorder)
routers.post('/upload-image', uploadMiddleware.single('file'), uploadImage);

export default routers;


