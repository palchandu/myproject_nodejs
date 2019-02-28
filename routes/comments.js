var express=require('express');
var router=express.Router();
var commentController=require('../controller/commentController');
router.get('/',function(req,res){
    res.json({message:"Successfully rout working"});
});
router.post('/add_comment',commentController.add_comment);
router.post('/remove_comment',commentController.updateStatus);
module.exports=router;