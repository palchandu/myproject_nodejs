var multer  = require('multer');
var moment  = require('moment');
var url  = require('url');
var library = require('../library/library');
var commomModel= require('../model/commonModel');
var commonController={};
commonController.upload_image=function(req,res){
   var resultsRes=[];
    var resultObject={};
    var date=moment();
    var dir_name=__basedir+'/public/images/'+date.year();
    var dir_name2=__basedir+'/public/images/'+date.year()+'/'+date.month();
    library.createDirectory(dir_name).then((path) => {
        library.createDirectory(dir_name2).then((path2)=>{
            const storage = multer.diskStorage({
                destination: (req, file, callback) => {
                    callback(null, path2);
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
                const promises=req.files.map((file) => {
                        var mediaName= file.filename;
                        var mediaSource= 'http://' + req.headers.host + '/images/' +date.year()+'/'+date.month()+'/'+ file.filename;
                        var gallery=new commomModel.Gallery({
                            imageName:mediaName,
                            imagePath:mediaSource,
                            meta_data:{ created_by:'12345'}
                        });
                        gallery.save().then((result)=>{
                                resultObject._id=result._id;
                                resultObject.imageName=result.imageName;
                                resultObject.imagePath=result.imagePath;
                                resultsRes.push(resultObject);
                                
                        }).catch((error)=>{
                            console.log(error);
                        });
                });
                res.json({message:"Successfully file uploaded"});
            });

            console.log(`Successfully created directory: '${path2}'`);
        }).catch((error2)=>{
            console.log(`Problem creating directory: ${error2.message}`)
        })
      }).catch((error) => {
        console.log(`Problem creating directory: ${error.message}`)
      });
    
}
commonController.getImage=function(req,res){
    commomModel.Gallery.find({deleted:'N'}).then((result)=>{
        res.json({status:200,data:result});
    }).catch((error)=>{
        res.json({status:201,data:error});
    })
}
commonController.getSingleImage=function(req,res){
    var url_parts = url.parse(req.url, true);
    var imageId=url_parts.id;
    commomModel.Gallery.find({_id:imageId,deleted:'N'}).then((result)=>{
        res.json({status:200,data:result});
    }).catch((error)=>{
        res.json({status:201,data:error});
    })
}
module.exports=commonController;