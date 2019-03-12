var valid_request=function(req,res,next){
    var token = req.headers['x-access-token'];
    if(!token){
        res.status(400).json({message:"Please send token"});
    }
    else if(token!='testing'){
        res.status(400).json({message:"Please send valid token"});
    }
    else{
    next();
    }
}

var user_log=function(req,res,next){
    console.log('user routes logged');
    next();
}

var users_token=function(req,res,next){
    var token = req.headers['x-access-token'];
    if(!token){
        res.status(400).json({message:"Please send token"});
    }
    else if(token!='users'){
        res.status(400).json({message:"Please send valid token"});
    }
    else{
    next();
    }
}
exports.valid_request=valid_request;
exports.user_log=user_log;
exports.users_token=users_token;