var express=require('express');
var router=express.Router();
var category=require('../controller/categoryController');
router.get('/',function(req,res){
    res.json({msg:"Welcome to category"});
});

router.post('/new_category',category.add_category);
router.get('/get_category',category.cate_list);
router.delete('/remove_category/:name',category.remove_category);
module.exports=router;