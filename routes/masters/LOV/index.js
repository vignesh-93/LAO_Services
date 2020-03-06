module.exports = function(params) {
    var app = params.app;
    const lovService = require("./service");
   
  
//Get all Languanges for List Of Values

    app.get("/getalllanguanges", async (req, res) => {
      "use strict";
      try {
        var getLanguanges = await lovService.getLanguange();

        if(getLanguanges.length>0)
        {
        res.send({
          "code":200,
          "result":"SUCCESS",
          "message":getLanguanges
          })
        }
        else
        {
        res.send({
          "code":402,
          "result":"NOT SUCCESS",
          "message":"No Active Languanges"
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


    //Get all Whole Saler Details for List Of Values

    app.get("/getallwholesalers", async (req, res) => {
        "use strict";
        try {
          var getWholesalers = await lovService.getWholesaler();
  
          if(getWholesalers.length>0)
          {
          res.send({
            "code":200,
            "result":"SUCCESS",
            "message":getWholesalers
            })
          }
          else
          {
          res.send({
            "code":402,
            "result":"NOT SUCCESS",
            "message":"No Active Wholesalers"
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
  