var mongoos=require('mongoose');
var Schema=mongoos.Schema;
var commonModel=require('./commonModel');
var personalAndWebsite=new Schema({
    name:{ type:String,minlength:3},
    designation:{ type:String},
    organisation:{ type:String},
    image:{ type:String},
    copyright:{ type:String}
});

var country_state_city=new Schema({
    country:{type:String},
    states:[commonModel.states],
    metaData:commonModel.metaData
});

var personal=mongoos.model('miscallaneous',personalAndWebsite);
var country_states=mongoos.model('country_state_city',country_state_city);
module.exports={
    personal:personal,
    country_states_city:country_states
}