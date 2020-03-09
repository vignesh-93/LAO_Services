module.exports = function (params) {
    var app = params.app;
    const orderService = require("./service");


    var datetime = new Date();

    //Create Order

    app.post("/createorder", async (req, res) => {
        "use strict";
        try {

          var status=[{

            "message" : "PLACED",
            "date" :datetime

          }]

          

            var orderdata = {

                "laoOrderId": "",
              //"userId": req.body.userId,
                "mobile": req.body.mobile,
                "products": req.body.order,
                "grandTotal": req.body.grandTotal,
                "status":"PLACED",
                "orderdate": datetime

            }

           
            if (req.body.userId == "" || req.body.userId == null || req.body.userId == undefined) {
                res.send({
                    "code": 400,
                    "result": "NOT SUCCESS",
                    "Message": "User Id Is Mandatory"
                })

                return false

            }
            if (req.body.mobile == "" || req.body.mobile == null || req.body.mobile == undefined) {
                res.send({
                    "code": 400,
                    "result": "NOT SUCCESS",
                    "Message": "Mobile Is Mandatory"
                })
                return false
            }

            var orderCount = 0;
            var count = await orderService.getordercount();

            if (count.length == 0) {

                orderCount = 1

            }
            else {

                orderCount = count[0].myCount + 1

            }

            var month = datetime.getMonth() + 1;
            var day = datetime.getDate();
            var year = datetime.getFullYear()

           

            if (month < 10) {

                month = '0' + month
            }
            if (day < 10) {

                day = '0' + day
            }
            if (orderCount < 10) {

                orderCount = '0' + orderCount
            }


           

            var orderId = "LOA" + year + "" + month + "" + day + "" + orderCount;

            orderdata.laoOrderId = orderId

            var grandTotal = 0

          

            for (let i = 0; i < orderdata.products.length; i++) {

              //  orderdata.products[i].status = status

              
                orderdata.products[i].totalPrice = orderdata.products[i].price * orderdata.products[i].qty

                orderdata.products[i].status=status;
               
                grandTotal += orderdata.products[i].totalPrice

                var getCart = await orderService.getCart(orderdata.products[i]._id);

                console.log(getCart)
                

                getCart.qty=orderdata.products[i].qty
                getCart.totalPrice=orderdata.products[i].price * orderdata.products[i].qty
               
                
                getCart.status = "InActive"
                getCart.updatedOn = datetime
                
                var cartData = await orderService.addtocart(getCart);
               
            }

            orderdata.grandTotal = grandTotal;
            orderdata.createdOn = datetime;

            var saveorder = await orderService.saveorder(orderdata);
            console.log("hai")
            if (saveorder) {
                res.send({
                    "code": 200,
                    "result": "SUCCESS",
                    "orderId": orderId
                })
            }
            else {
                res.send({
                    "code": 400,
                    "result": "NOT SUCCESS"
                })
            }

        } catch (err) {

            res.send({
                "code": 400,
                "result": "NOT SUCCESS",
                "ERROR": err
            })
        }
    });


    //Get Wholesaler Orders

    app.get("/getallorders", async (req, res) => {
        "use strict";
        try {
  

          var getwholesaler = await orderService.getwholesaler(req.query.mobile);

          console.log(getwholesaler)


          if(getwholesaler.length>0)
          {

            var getorders = await orderService.getorderdetails(getwholesaler[0]._id);

            if(getorders.length>0)
            {
            res.send({
              "code":200,
              "result":"SUCCESS",
              "message":getorders
              })
            }
            else
            {
            res.send({
              "code":402,
              "result":"NOT SUCCESS",
              "message":"No Orders Found"
              })
            }
          
          }
          else
          {

            res.send({
              "code":402,
              "result":"NOT SUCCESS",
              "message":"No Wholesaler Found"
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


    //Get Retailer  Orders

    app.get("/getmyorders", async (req, res) => {
        "use strict";
        try {
  
          var getorders = await orderService.getmyorderdetails(req.query.mobile);

          if(getorders.length>0)
          {
          res.send({
            "code":200,
            "result":"SUCCESS",
            "message":getorders
            })
          }
          else
          {
          res.send({
            "code":402,
            "result":"NOT SUCCESS",
            "message":"No Orders Found"
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

      //Update Order Status

    app.post("/updateorderstatus", async (req, res) => {
        "use strict";
        try {
  
          var getorders = await orderService.getupdatedetail(req.body);


          if(getorders.length>0)
          {

           for(let i=0;i<getorders[0].products.length;i++)
           {


            if(getorders[0].products[i]._id===req.body.productid)
            {
                var status={
                    message:req.body.status,
                    date:datetime
                }

                getorders[0].products[i].status.push(status)

                var saveorder = await orderService.saveorder(getorders[0]);

                if (saveorder) {
                    res.send({
                        "code": 200,
                        "result": "SUCCESS",
                        "message":"Status Updated Success"
                    })
                }
                else {
                    res.send({
                        "code": 400,
                        "result": "NOT SUCCESS",
                        "message":"Status Updated Failed"
                    })
                }

            }
        }
    }
        
          else
          {
          res.send({
            "code":402,
            "result":"NOT SUCCESS",
            "message":"No Orders Found"
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


        //Get wholesaler order count for dashboard

    app.get("/getdashboardstatuscount", async (req, res) => {
      "use strict";
      try {

        var getwholesaler = await orderService.getwholesaler(req.query.mobile);
        
        if(getwholesaler.length>0)
        {

          var getproductcount = await orderService.getdashboardproductcount(getwholesaler[0]._id);

//console.log(getproductcount)

          var getorderscount = await orderService.getdashboardstatuscount(getwholesaler[0]._id);



          if(getorderscount.length>0)
          {
          res.send({
            "code":200,
            "result":"SUCCESS",
            "productcount":getproductcount[0].productcount,
            "message":getorderscount,
            
            })
          }
          else
          {
          res.send({
            "code":402,
            "result":"NOT SUCCESS",
            "productcount":getproductcount[0].productcount,
            "message":"No Orders Found"
            })
          }
        
        }
        else
        {

          res.send({
            "code":402,
            "result":"NOT SUCCESS",
            "message":"No Wholesaler Found"
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

   // Find Specified Order Details

   app.get("/getSpecifiedOrder", async (req, res) => {
    "use strict";
    try {

      var getSpecifiedOrder = await orderService.getSpecifiedOrder(req.query.laoOrderId);

      // console.log(getSpecifiedOrder,"33333333")

      if(getSpecifiedOrder.length>0)
      {

        res.send({
          "code":200,
          "result":"SUCCESS",
          "message":getSpecifiedOrder
          })
        }
        else
        {
        res.send({
          "code":402,
          "result":"NOT SUCCESS",
          "message":"No Orders Found"
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


  // Billing Screen

  app.get("/getBillingScreen", async (req, res) => {
    "use strict";
    try {

      
    
    } catch (err) {

      res.send({
        "code":400,
        "result":"NOT SUCCESS",
        "message":err
        })
    }
  });

};
