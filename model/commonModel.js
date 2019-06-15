var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var metaData=new Schema({
    deleted: { type: String,default: 'N'}, //Y=Deleted and N for not deleted
    created: { type: Date, default: Date.now }, // Created Date of Loan
    created_by: { type: Number }, // Created Date of Loan
    udated: { type: Date, default: Date.now }, // Updated Date of Loan
    updated_by: { type: Number,default: 0 },
})
var cities=new Schema({
    city:{type:String},
    metaData:metaData
})

var states=new Schema({
    state:{type:String},
    city:[cities],
    metaData:metaData
});



module.exports={
    metaData:metaData,
    states:states,
    cities:cities
}