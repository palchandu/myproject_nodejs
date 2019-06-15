var Posts=require('../model/postModel');
var Comments=require('../model/commentModel');
var commentController={};

commentController.add_comment=function(req,res){
    var comment_val=req.body.comments;
    var user_id=req.body.user;
    var post_id=req.body.post_id;
    var comments=new Comments({
        body:comment_val,
        user_id:user_id,
        post_id:post_id
    });
    console.log(comments);
    Posts.update({_id:post_id},{$push: {comments: comments}}).exec().then((result)=>{
        res.status(200).json(result);
    }).catch((error)=>{
        console.log(error);
    })
   
}

commentController.remove_comment=function(req,res){
    var post_id=req.body.pid;
    var comment_id=req.body.cid;
    Posts.update({_id:post_id},{$pull:{comments_id:comment_id}},{safe:true}).then(function(result){
        res.json({status:200,message:"Successfully comment removed",doc:result});
    }).catch(function(err){
        res.json({status:201,message:"Something wrong!",doc:err});
    });
}

commentController.updateStatus=function(req,res){
    var comment_id=req.body.id;
    Comment.findOneAndUpdate(
        {_id:comment_id},{status:'Y'},
        function(err,doc){
        if(err){
            res.json({status:201,message:"Something wrong!",doc:err});
        }else{
            res.json({status:200,message:"Successfully comment removed"});
        }
    });
}
module.exports=commentController;