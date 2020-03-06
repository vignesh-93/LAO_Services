module.exports = function(params) {
    var app = params.app;
    const productService = require("./service");
   
//Get all products

    app.get("/getallproducts", async (req, res) => {
      "use strict";
      try {

        var start;
        var end;

        var getWholesaler = await productService.getWholesaler(req.query.mobile);

        if(getWholesaler.length>0)
        {
         
        }
        else
        {
        res.send({
          "code":402,
          "result":"NOT SUCCESS",
          "message":"No Active Wholesaler"
          })
        return false
        }

        var getCategories = await productService.getSubCategories(getWholesaler[0]._id,req.query.category);

        var category = "";

        if(getCategories.length>0)
        {
          category = getCategories.id;
        }
        else
        {
          category = req.query.category;
        }

        if(req.query.page==0)
        {
            start = 0;
            end  = 5;
            var getProducts = await productService.getProducts(getWholesaler[0]._id,category,req.query.languange,start,end);
        }
        else
        {
            start = req.query.page * 5;
            end  = 5;
            var getProducts = await productService.getProducts(getWholesaler[0]._id,category,req.query.languange,start,end);
        }
        if(getProducts.length>0)
        {
        res.send({
          "code":200,
          "result":"SUCCESS",
          "message":getProducts
          })
        }
        else
        {
        res.send({
          "code":402,
          "result":"NOT SUCCESS",
          "message":"No Active Products"
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

    app.get("/quickcart", async (req, res) => {
      "use strict";
      try {

        var start;
        var end;

        var getWholesaler = await productService.getWholesaler(req.query.mobile);

        if(getWholesaler.length>0)
        {
         
        }
        else
        {
        res.send({
          "code":402,
          "result":"NOT SUCCESS",
          "message":"No Active Wholesaler"
          })
          return false
        }

        if(req.query.page==0)
        {
            start = 0;
            end  = 5;
            var getProducts = await productService.getQuickCart(getWholesaler[0]._id,req.query.productname,req.query.languange,start,end);
        }
        else
        {
            start = req.query.page * 5;
            end  = 5;
            var getProducts = await productService.getQuickCart(getWholesaler[0]._id,req.query.productname,req.query.languange,start,end);
        }
        
        if(getProducts.length>0)
        {
        res.send({
          "code":200,
          "result":"SUCCESS",
          "message":getProducts
          })
        }
        else
        {
        res.send({
          "code":402,
          "result":"NOT SUCCESS",
          "message":"No Active Products"
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

//Get All Products for Quick cart

    app.get("/quickallproducts", async (req, res) => {
      "use strict";
      try {

        var start;
        var end;

        var getWholesaler = await productService.getWholesaler(req.query.mobile);

        if(getWholesaler.length>0)
        {
         
        }
        else
        {
        res.send({
          "code":402,
          "result":"NOT SUCCESS",
          "message":"No Active Wholesaler"
          })
          return false
        }

        if(req.query.page==0)
        {
            start = 0;
            end  = 5;
            var getProducts = await productService.getallProducts(getWholesaler[0]._id,req.query.languange,start,end);
        }
        else
        {
            start = req.query.page * 5;
            end  = 5;
            var getProducts = await productService.getallProducts(getWholesaler[0]._id,req.query.languange,start,end);
        }
        
        if(getProducts.length>0)
        {
        res.send({
          "code":200,
          "result":"SUCCESS",
          "message":getProducts
          })
        }
        else
        {
        res.send({
          "code":402,
          "result":"NOT SUCCESS",
          "message":"No Active Products"
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



     
//Get all products

app.get("/getallwholesalerproducts", async (req, res) => {
  "use strict";
  try {

    var start;
    var end;

    var getWholesaler = await productService.getWholesaler(req.query.mobile);

    if(getWholesaler.length>0)
    {
     
    }
    else
    {
    res.send({
      "code":402,
      "result":"NOT SUCCESS",
      "message":"No Active Wholesaler"
      })
    return false
    }

    if(req.query.page==0)
    {
        start = 0;
        end  = 5;
        var getProducts = await productService.getWholesalerProducts(getWholesaler[0]._id,req.query.languange,start,end);
    }
    else
    {
        start = req.query.page * 5;
        end  = 5;
        var getProducts = await productService.getWholesalerProducts(getWholesaler[0]._id,req.query.languange,start,end);
    }
    if(getProducts.length>0)
    {
    res.send({
      "code":200,
      "result":"SUCCESS",
      "message":getProducts
      })
    }
    else
    {
    res.send({
      "code":402,
      "result":"NOT SUCCESS",
      "message":"No Active Products"
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

//Update Product by Whole saler

app.post("/updatewholesalerproduct", async (req, res) => {
  "use strict";
  try {

  
    var getproductdetails = await productService.getProduct(req.body.sku);

    if(getproductdetails.length>0)
    {

      getproductdetails[0].price=req.body.price
      var updateproduct = await productService.updateProduct(getproductdetails[0]);

      if(updateproduct)
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
    else
    {
    res.send({
      "code":402,
      "result":"NOT SUCCESS",
      "message":"No Active SKU"
      })
    return false
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
  