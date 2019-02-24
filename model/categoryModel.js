var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var categorySchema=new Schema({
    name:{type:String,required:true},
    created:{ type:Date,default:Date.now()},
    deleted:{ type:String,default:'N'}
});

module.exports=mongoose.model('category',categorySchema);