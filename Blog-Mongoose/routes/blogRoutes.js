import express from 'express';
import {createUser,getAllUsers,getUser,updateUser,deleteUser} from '../controller/userController.js'
import {createPost,getAllPosts,getSinglePost,updatePost,deletePost} from '../controller/postController.js'
import {createComment,getAllComments,getCommentById,updateComment,deleteComment} from '../controller/commentController.js'

const router = express.Router();

router.post('/user',createUser);
router.get('/users',getAllUsers);
router.get("/user/:id", getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

router.post('/post',createPost);
router.get('/posts',getAllPosts)
router.get('/post/:id',getSinglePost)
router.put('/post/:id',updatePost)
router.delete('/post/:id',deletePost)

router.post('/post/comment', createComment)
router.get('/post/comment',getAllComments)
router.get('/post/comment/:id',getCommentById)
router.put('/post/comment/:id',updateComment)
router.delete('/post/comment/:id',deleteComment)




export default router;