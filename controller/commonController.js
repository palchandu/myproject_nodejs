var multer  = require('multer');
var moment = require('moment-timezone');
moment.tz.add("Asia/Calcutta|HMT BURT IST IST|-5R.k -6u -5u -6u|01232|-18LFR.k 1unn.k HB0 7zX0");
moment.tz.link("Asia/Calcutta|Asia/Kolkata");
var url  = require('url');
var library = require('../library/library');
var commomModel= require('../model/commonModel');
var commonController={};
//Create Storage
var date=moment();
var dir_name=__basedir+'/public/images/'+date.year();
var dir_name2=__basedir+'/public/images/'+date.year()+'/'+date.month();
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, dir_name2);
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname);
    }
});

/*Single Image Upload */
commonController.upload_image=function(req,res){
    var resultObject={};
    library.createDirectory(dir_name).then((path) => {
        library.createDirectory(dir_name2).then((path2)=>{

            const upload = multer({storage: storage}).single('file');
            upload(req, res, (err) => {
                if (err) {
                    return res.status(400).send({
                        message: helper.getErrorMessage(err)
                    });
                }
                //console.log(req.file);
                var mediaName= req.file.filename;
                var mediaSource= 'http://' + req.headers.host + '/images/' +date.year()+'/'+date.month()+'/'+ mediaName;
                var gallery=new commomModel.Gallery({
                    imageName:mediaName,
                    imagePath:mediaSource,
                    meta_data:{ created_by:'12345'}
                   });
                gallery.save().then((result)=>{
                        resultObject._id=result._id;
                        resultObject.imageName=result.imageName;
                        resultObject.imagePath=result.imagePath;
                        res.json({message:"Successfully file uploaded",files:resultObject});
                }).catch((error)=>{
                    console.log(error);
                });
            });

            console.log(`Successfully created directory: '${path2}'`);
        }).catch((error2)=>{
            console.log(`Problem creating directory: ${error2.message}`)
        })
      }).catch((error) => {
        console.log(`Problem creating directory: ${error.message}`)
      });
    
}

/*Multiple Image Upload */
commonController.multiple_image_upload=async function(req,res){
    

    library.createDirectory(dir_name).then(async (path) => {
        library.createDirectory(dir_name2).then(async (path2)=>{

            const upload = multer({storage: storage}).array('file',12);
            upload(req, res, async (err) => {
                if (err) {
                    return res.status(400).send({
                        message: helper.getErrorMessage(err)
                    });
                }
                //console.log(req.files);
                var allFiles=req.files;
                var allImage=await library.multipleImageValue(req,date,allFiles);
                console.log('-----------controller',allImage);
                res.json({message:"Successfully file uploaded",files:allImage});
                
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
    commomModel.Gallery.find({"meta_data.deleted":'N'},'imagePath').then((result)=>{
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