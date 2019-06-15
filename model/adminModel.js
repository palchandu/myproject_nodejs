var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var adminSchema=new Schema({
    name:{ type:Text},
    email:{ type:Text,required:true},
    pass:{ type:Text,required:true}
});

module.exports=mongoose.model('admin',adminSchema);