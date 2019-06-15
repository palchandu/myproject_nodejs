var multer  = require('multer');
var Misc=require('../model/miscallaneous');
var CommonModel=require('../model/commonModel');
var miscController={};
var google=require('../utility/index');
miscController.add_details=function(req,res){
    
    profilArray=new Misc({
        name:req.body.name,
        designation:req.body.designation,
        organisation:req.body.organisation,
        image:req.body.image,
        copyright:req.body.copyright
    });
    profilArray.save().then(function(result1){
        res.json({
            status:"200",
            message:"Profile updated",
            data:result1
        });
    }).catch(function(error){
        res.status(201).json({
            message:"Something wrong!try again",
            error:error
        })
    });
}

miscController.find_details=function(req,res){
    Misc.find({}).exec().then(function(result){
        res.json(result);
    }).catch(function(error){
        res.json({status:202,message:"Something wrong!"});
    })
}

miscController.update_profile=function(req,res){
    updt_query={name:req.body.name,
                designation:req.body.designation,
                organisation:req.body.organisation,
                image:req.body.image,
                copyright:req.body.copyright
                }
    Misc.findOneAndUpdate({_id:req.body._id},updt_query).then(function(result){
        res.json({status:200,message:"Updated Successfully",data:result});
    }).catch(function(error){
        res.json({status:202,message:"something wrong",error:error});
    })
}
miscController.getFiles=function(req,res){
    var files=google.getFile();
    res.json({file:files});
}

miscController.add_country=function(req,res){
    var country=req.body.country;
    var countrySave=new Misc.country_states_city({
        country:country
    });
    Misc.country_states_city.findOne({"country":country},'country').exec().then((findRes)=>{
        console.log(findRes);
        if(findRes!=null){
            if(findRes.country==country){
                res.json({message:"Country already exists"});
            }
            else{
                countrySave.save().then((result)=>{
                    res.json({result:result});
                }).catch((error)=>{
                    console.log(error);
                })
            }
        }
        else{
            countrySave.save().then((result)=>{
                res.json({result:result});
            }).catch((error)=>{
                console.log(error);
            })
        }
    }).catch((findError)=>{
        console.log(findError);
    })
    
}
miscController.add_states=(req,res)=>{
    var country=req.body.country;
    var state=req.body.state;
    var saveState={
        state:state
    };
    Misc.country_states_city.update({"country":country},{$push:{"states":saveState}}).exec().then((response)=>{
        if(response.nModified==1){
            res.json({message:"States Added Successfully"});
        }
        else{
            res.json({message:"Something Wrong!try again"});
        }
        
    }).catch((error)=>{
        console.log(error);
    })
}
miscController.add_city=(req,res)=>{
    var country=req.body.country;
    var state=req.body.state;
    var city=req.body.city;
    var saveCity={
        city:city
    }

    Misc.country_states_city.updateOne({"country":country,"states.state":state},{$push:{"states.city":saveCity}}).exec().then((response)=>{
        if(response.nModified==1){
            res.json({message:"City Added Successfully"});
        }
        else{
            res.json({message:"Something Wrong!try again"});
        }
        
    }).catch((error)=>{
        console.log(error);
    })

}
module.exports=miscController;