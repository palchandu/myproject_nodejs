var mongoose=require('mongoose');
var Schema=mongoose.Schema;
 var commentSchema=new Schema({
    body:{ type:String,required:true},
    user_id:{ type:Schema.Types.ObjectId,ref:'users' },
    post_id:{ type:Schema.Types.ObjectId,ref:'Posts'},
    status:{ type:String,default:'N'}
});

module.exports=commentSchema;