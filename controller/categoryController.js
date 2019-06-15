var Category=require('../model/categoryModel');
var categoryController={};

/*Add category */

categoryController.add_category=function(req,res){
    Category.findOne({name:req.body.name}).exec().then(function(result){
        if(result!=null)
        {
            if(req.body.name==result.name){
                res.json({
                    status:"201",
                    message:"Category already exists"
                });
            }
        }else{
            cateArray=new Category({
                name:req.body.name,
                metaData:{created_by:'12345'}
            });
            console.log(cateArray);
            cateArray.save().then(function(result){
                res.json({
                    status:"200",
                    message:"New Category created",
                    data:result
                });
            }).catch(function(error){
                res.status(201).json({
                    message:"Something wrong!try again"
                })
            });
        }
    }).catch(function(error){
        res.json({status:"201",message:"Category name already exists"});
    });
}

/*Find Category List */
categoryController.cate_list=function(req,res){
    Category.find({"metaData.deleted":"N"},'name').exec().then(function(result){
        if(result!=null){
            //res.json({status:200,message:"List of all categories",data:result});
            res.json(result);
        }
        else{
            res.json({status:201,message:"No record found."});
        }
    }).catch(function(error){
        res.json({status:201,message:"Something wrong!try again"});
    });
}
/*Delete Category */
categoryController.remove_category=function(req,res){
    Category.deleteMany({name:req.params.name}).exec().then(function(result){
        res.json({data:result});
    }).catch(function(error){
        res.json({status:201,message:"Something wrong!",data:error});
    });
}

module.exports=categoryController;