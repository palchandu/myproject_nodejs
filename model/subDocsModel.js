var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var MetaData=new Schema({
    created:{ type:Date,default:Date.now()},
    created_by:{ type:String},
    deleted:{ type:String,default:'N'},
    deleted_by:{ type:String}
});

module.exports={
    MetaData:MetaData
}