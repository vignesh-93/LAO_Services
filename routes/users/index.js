module.exports = function(params) {
    var app = params.app;
    const userService = require("./service");
   
  
    app.post("/saveretailer", async (req, res) => {
      "use strict";
      try {

        var checkRetailerExists = await userService.checkRetailer(req.body.mobile);

        if(checkRetailerExists.length>0)
        {
        res.send({
          "code":400,
          "result":"NOT SUCCESS",
          "message":"Retailer Already Exists"
          })

          return false
        }
       
        var saveRetailer = await userService.saveDetails(req.body);

        if(saveRetailer)
        {
        res.send({
          "code":200,
          "result":"SUCCESS"
          })
        }
        else
        {
        res.send({
          "code":400,
          "result":"NOT SUCCESS"
          })
        }
       
      } catch (err) {
  
        res.send({
          "code":400,
          "result":"NOT SUCCESS",
          "ERROR":err
          })
      }
    });


    app.post("/retailerlogin", async (req, res) => {
      "use strict";
      try {

        var Retailerlogin= await userService.loginRetailer(req.body);

        if(Retailerlogin.length>0)
        {
        
          res.send({
          "code":200,
          "result":"SUCCESS",
          "message":Retailerlogin
          })

        }
        else{

          res.send({
            "code":400,
            "result":"NOT SUCCESS"
            })

        }
      
      
       
      } catch (err) {
  
        res.send({
          "code":400,
          "result":"NOT SUCCESS",
          "ERROR":err
          })
      }
    });
  
  
    
  };
  