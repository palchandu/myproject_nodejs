const fs = require('fs');
const path = require('path');
var commomModel= require('../model/commonModel');
module.exports.createDirectory=function(directoryPath) {
    const directory = path.normalize(directoryPath);
  
    return new Promise((resolve, reject) => {
      fs.stat(directory, (error) => {
        if (error) {
          if (error.code === 'ENOENT') {
            fs.mkdir(directory, (error) => {
              if (error) {
                reject(error);
              } else {
                resolve(directory);
              }
            });
          } else {
            reject(error);
          }
        } else {
          resolve(directory);
        }
      });
    });
  }

  module.exports.multipleImageValue=async (req,date,arrVal)=>{
    var resultsRes=[];
    var i=0;
    if(arrVal && arrVal.length > 0){
      const imageFun =  async () =>{
        for(var images of arrVal){
            var mediaName= images.filename;
            var mediaSource= 'http://' + req.headers.host + '/images/' +date.year()+'/'+date.month()+'/'+ mediaName;
            var allResult=await saveImage(mediaName,mediaSource);
            resultsRes.push(allResult);
        }
        console.log("resultImage",resultsRes)
        return resultsRes;
      }
      return imageFun();
    }
  }

  async function saveImage(mediaName,mediaSource){
    var resultObject={};
    return new Promise((resolve,reject)=>{
      var gallery=new commomModel.Gallery({
        imageName:mediaName,
        imagePath:mediaSource,
        meta_data:{ created_by:'12345'}
      });
      gallery.save().then((result)=>{
        resultObject._id=result._id;
        resultObject.imageName=result.imageName;
        resultObject.imagePath=result.imagePath;
            resolve(resultObject);   
        }).catch((error)=>{
          console.log(error);
          reject(error);
        });
    })
  }