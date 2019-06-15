var mongoos=require('mongoose');
var Schema=mongoos.Schema;
var personalAndWebsite=new Schema({
    name:{ type:String,minlength:3},
    designation:{ type:String},
    organisation:{ type:String},
    image:{ type:String},
    copyright:{ type:String}
});

module.exports=mongoos.model('miscallaneous',personalAndWebsite);