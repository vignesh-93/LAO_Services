module.exports = function(params) {
    var app = params.app;
    const wholesalerService = require("./service");
   
  
    app.post("/savewholesaler", async (req, res) => {
      "use strict";
      try {



        var checkWholesalerExists = await wholesalerService.checkWholesaler(req.body.mobile);

        if(checkWholesalerExists.length>0)
        {
        res.send({
          "code":400,
          "result":"NOT SUCCESS",
          "message":"Retailer Already Exists"
          })

          return false
        }
      

        var savewholesaler = await wholesalerService.saveDetails(req.body);

        if(savewholesaler)
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
  
    
  };
  