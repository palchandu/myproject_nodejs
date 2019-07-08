var express=require('express');
var router=express.Router();
var commonController=require('../controller/commonController');
router.get('/',function(req,res){
    res.send({message:"Common Routes"});
});
router.post('/upload',commonController.upload_image);
router.post('/upload_multiple',commonController.multiple_image_upload);
router.get('/images',commonController.getImage);
router.get('/images/:id',commonController.getSingleImage);
module.exports=router;