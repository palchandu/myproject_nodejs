var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var postSchema=new Schema({
    title:{type:String,required:true},
    content:{ type:String,required:true},
    slug:{ type:String,required:true},
    author:{ type:Schema.Types.ObjectId,ref:'users'},
    comments_id:[{ type:Schema.Types.ObjectId,ref:'comment'}],
    status:{ type:String,default:'N'}
});

module.exports=mongoose.model('Posts',postSchema);