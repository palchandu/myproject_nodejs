var Misc=require('../model/miscallaneous');
var miscController={};
var google=require('../utility/index');
miscController.add_details=function(req,res){
    
    Misc.personal.findOne({role:'admin'}).exec().then((response)=>{
       if(response==null){
        if(req.body.flage=='basic_update'){
            profilArray=new Misc.personal({
                fullName:req.body.fullName,
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
        }else{
            res.status(201).json({
                message:"First update profile basic details"
            })
        }
       }
       else{
            if(req.body.flage=='basic_update'){
                var fullname=req.body.fullName;
                var designation=req.body.designation;
                var organisation=req.body.organisation;
                Misc.personal.update({role:'admin'},{$set:{"fullName":fullname,"designation":designation,"organisation":organisation}}).exec().then((response)=>{
                    res.json({
                        status:"200",
                        message:"Basic Information Updated Successfully",
                        data:response
                    });
                }).catch((error)=>{
                    res.status(201).json({message:'Something wrong to update basic information',error:error});
                })
            }
            if(req.body.flage=='picture_update'){
                var image=req.body.image;
                Misc.personal.update({role:'admin'},{$set:{"image":image}}).exec().then((response)=>{
                    res.json({
                        status:"200",
                        message:"Profile Picture Updated Successfully",
                        data:response
                    });
                }).catch((error)=>{
                    res.status(201).json({message:'Something wrong to update profile picture',error:error});
                })
            }
            if(req.body.flage=='copyright_update'){
                var copyright=req.body.copyright;
                Misc.personal.update({role:'admin'},{$set:{"copyright":copyright}}).exec().then((response)=>{
                    res.json({
                        status:"200",
                        message:"Copyright Updated Successfully",
                        data:response
                    });
                }).catch((error)=>{
                    res.status(201).json({message:'Something wrong to update copyright',error:error});
                })
            }

       }
    }).catch((error)=>{
        res.status(201).json({message:'Something Wrong to find profile',error:error});
    })
    
}

miscController.find_details=function(req,res){
    Misc.personal.findOne({role:'admin'}).exec().then(function(result){
        res.status(200).json(result);
    }).catch(function(error){
        res.json({status:202,message:"Something wrong!"});
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