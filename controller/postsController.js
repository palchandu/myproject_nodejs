var Posts=require('../model/postModel');
var postController={};

postController.insert_post=function(req,res){
    var title=req.body.title;
    var body=req.body.content;
    var slug=title.split(' ').join('_');
    var author=req.body.author;
    var posts=new Posts({
        title:title,
        content:body,
        slug:slug,
        author:author
    });
    posts.save().then(function(result){
        res.json({status:200,message:"Successfully post created"});
    }).catch(function(error){
        res.json({status:201,message:"Something Wrong",error:error});
    })
}

postController.post_list=function(req,res){
    Posts.find({}).populate('author').populate('comments_id').exec().then(function(result){
        res.json({status:200,message:"Posts lists",data:result});
    }).catch(function(error){
        res.json({status:202,message:"Something wrong!"});
    });
}

module.exports=postController;