module.exports = function(params) {
    var app = params.app;
    const cartService = require("./service");
   
    var datetime = new Date();
//Add Products To Cart

app.post("/addtocart", async (req, res) => {
    "use strict";
    try {
 
    //  if(req.body.userId == "" || req.body.userId == null || req.body.userId == undefined)
    //  {
    //     res.send({
    //         "code":400,
    //         "result":"NOT SUCCESS",
    //         "Message":"User Id Is Mandatory"
    //         })

    //         return false

    //  }
     if(req.body.mobile=="" || req.body.mobile==null || req.body.mobile==undefined)
     {
        res.send({
            "code":400,
            "result":"NOT SUCCESS",
            "Message":"Mobile Is Mandatory"
            })

            return false
     }


     var checkCart = await cartService.checkcart(req.body.sku,req.body.mobile);

     if(checkCart!==null)
      {

        checkCart.qty=req.body.qty;
        checkCart.totalPrice=req.body.qty*req.body.price;

        var cartData = await cartService.addtocart(checkCart);
      }
      else
      {
        req.body.totalPrice=req.body.qty*req.body.price;
        req.body.status="Active";
        req.body.createdOn=datetime;
       
         var cartData = await cartService.addtocart(req.body);
      }

      if(cartData)
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

  //View Cart Details

  app.get("/viewcart", async (req, res) => {
    "use strict";
    try {

      var viewCart = await cartService.viewCart(req.query);
      var address = await cartService.getwholesaleraddress(viewCart[0].wholesaler);

      if(viewCart.length>0)
      {
      res.send({
        "code":200,
        "result":"SUCCESS",
        "message":viewCart,
        "WholesalerAddress":address
        })
      }
      else
      {
      res.send({
        "code":402,
        "result":"NOT SUCCESS",
        "message":"No Cart Data"
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

    //Remove Cart Details

    app.get("/removecart", async (req, res) => {
      "use strict";
      try {
  
        var getCart = await cartService.getCart(req.query.id);

       if(getCart == null)
       {
        res.send({
          "code":402,
          "result":"NOT SUCCESS",
          })
       }
       else
       {
        getCart.status = "InActive"
        getCart.updatedOn = datetime
        var cartData = await cartService.addtocart(getCart);

        if(cartData)
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
  