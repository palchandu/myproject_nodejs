var multer  = require('multer');
var Misc=require('../model/miscallaneous');
var miscController={};

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

module.exports=miscController;