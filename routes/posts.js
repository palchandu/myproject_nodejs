var express=require('express');
var router=express.Router();
var postController=require('../controller/postsController');
router.post('/add_posts',postController.insert_post);
router.get('/posts_lists',postController.post_list);

module.exports=router;