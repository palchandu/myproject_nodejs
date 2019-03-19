var multer  = require('multer');
var Misc=require('../model/miscallaneous');
var miscController={};

miscController.add_details=function(req,res){
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './public/images');
        },
        filename: (req, file, callback) => {
            callback(null, Date.now() + '-' + file.originalname);
        }
    });

    const upload = multer({storage: storage}).any('file');

    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({
                message: helper.getErrorMessage(err)
            });
        }
        let results = req.files.map((file) => {
            return {
                mediaName: file.filename,
                origMediaName: file.originalname,
                mediaSource: 'http://' + req.headers.host + '/public/images/' + file.filename
            }
        });
        profilArray=new Misc({
            name:req.body.name,
            designation:req.body.designation,
            organisation:req.body.organisation,
            image:results[0].mediaSource,
            copyright:req.body.copyright
        });

        res.json(profilArray);
        profilArray.save().then(function(result1){
            res.json({
                status:"200",
                message:"Profile updated",
                data:result1
            });
        }).catch(function(error){
            res.status(201).json({
                message:"Something wrong!try again"
            })
        });
       
    });

}

module.exports=miscController;