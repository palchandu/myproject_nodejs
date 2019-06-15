var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var commonModel=require('../model/commonModel');
var categorySchema=new Schema({
    name:{type:String,required:true},
    metaData:commonModel.metaData
});

module.exports=mongoose.model('category',categorySchema);