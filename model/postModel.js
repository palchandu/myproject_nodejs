var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var postSchema=new Schema({
    title:{type:String,required:true},
    content:{ type:String,required:true},
    slug:{ type:String,required:true},
    author:{ type:Schema.Types.ObjectId,ref:'users'}
});

module.exports=mongoose.model('Posts',postSchema);