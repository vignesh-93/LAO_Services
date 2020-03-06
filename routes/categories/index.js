module.exports = function(params) {
    var app = params.app;
    const categoryService = require("./service");
   
//Get all Categories

    app.get("/getallcategories", async (req, res) => {
      "use strict";
      try {


       var getWholesaler = await categoryService.getWholesaler(req.query.mobile);

        var parent=null;

        if(req.query.id!==undefined)
        {
            parent=req.query.id 
            var getCategories = await categoryService.getSubCategories(getWholesaler[0]._id,parent);
        }
        else
        {
            var getCategories = await categoryService.getCategories(getWholesaler[0]._id,parent);
        }
        if(getCategories.length>0)
        {
        res.send({
          "code":200,
          "result":"SUCCESS",
          "message":getCategories
          })
        }
        else
        {
        res.send({
          "code":402,
          "result":"NOT SUCCESS",
          "message":"No Active Categories"
          })
        }  
      } catch (err) {
  
        res.send({
          "code":400,
          "result":"NOT SUCCESS",
          "message":err
          })
      }
    });

  };
  