var jwt=require('jsonwebtoken');
var bcrypt=require('bcryptjs');
var Users=require('../model/userModel');
userController={};

userController.register=function(req,res){
    Users.count({email:req.body.email}).exec().then(function(result){
        if(result==0){
            if(req.body.email==result.email){
                res.status(201).json({message:"Email already exists",data:result});
            }
            else{
                bcrypt.hash(req.body.password,10,function(err,hash){
                    if(err){
                        return res.status(201).json({error:err});
                    }
                    else{
                        var name=req.body.name;
                        var email=req.body.email;
                        var password=hash;
                        var userArray=new Users({
                            name:name,
                            email:email,
                            password:password
                        });
                        userArray.save().then(function(result){
                            res.json({
                                status:200,
                                success: 'New user has been created',
                                data:result
                             });
                        }).catch(function(err){
                            res.json({
                                status:201,
                                error: err
                             });
                        })
                    }
                });
            }
        }
        else{
            res.json({
                status:201,
                success: 'User with this email already exists'
             });
        }
    }).catch(function(error){
        res.status(400).json({status:400,error:error});
    });
}

module.exports=userController;