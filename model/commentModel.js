var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var commentSchema=new Schema({
    body:{ type:String,required:true},
    user_id:{ type:Schema.Types.ObjectId,ref:'users' },
    post_id:{ type:Schema.Types.ObjectId,ref:'Posts'}
});

module.exports=mongoose.model('comment',commentSchema);