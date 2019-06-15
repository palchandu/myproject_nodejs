var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var subDocs=require('./subDocsModel');
var gallerySchema=new Schema({
    imageName:{ type:String,required:true},
    imagePath:{ type:String,required:true},
    meta_data:subDocs.MetaData
});

var Gallery=mongoose.model('Gallery',gallerySchema);

module.exports={
Gallery:Gallery
};