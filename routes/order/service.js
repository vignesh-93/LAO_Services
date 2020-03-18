const service = require("../../lib/http/invoke");
var MongoClient = require("mongodb").MongoClient;
 
const ObjectId = require("mongodb").ObjectID;



let getordercount = async() => {
    try {
  
      var postdata = {
        url: process.env.DB_URL,
        client: "LAO_Order",
        docType: 1,
        query: [
            { $group: { _id: "_id", myCount: { $sum: 1 } } },
            { $project: { _id: 0 } }
        ]
      };
  
      let data = await service.makeHttpCall("post", "aggregate", postdata);
  
      return data.data.statusMessage;
    } catch (err) {
      return false;
    }
  
  };


let saveorder = async orderData => {
  try {

    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Order",
      docType: 0,
      query: orderData
    };

    let data = await service.makeHttpCall("post", "write", postdata);

    return data.data.statusMessage;
  } catch (err) {

    return false;
  }

};

let getCart = async(id) => {
    try {
  
      var postdata = {
        url: process.env.DB_URL,
        client: "LAO_Cart",
        docType: 0,
        query: {"_id": ObjectId(id)}
      
      }
  
      let data = await service.makeHttpCall("post", "read", postdata);
  
      return data.data.statusMessage;
    } catch (err) {
      return false;
    }
  
  };

  let addtocart = async cartData => {
    try {
  
      var postdata = {
        url: process.env.DB_URL,
        client: "LAO_Cart",
        docType: 0,
        query: cartData
      };
  
      let data = await service.makeHttpCall("post", "write", postdata);
  
      return data.data.statusMessage;
    } catch (err) {
  
      return false;
    }
  
  };


  let getorderdetails = async(inputdata) => {
    try {

      var postdata = {
        url: process.env.DB_URL,
        client: "LAO_Retailer_Details",
        docType: 1,
        query: [

          {$match:{"wholesaler":inputdata}},
          
          {$lookup:{
                    "from": "LAO_Order",
                    "localField": "mobile",
                    "foreignField": "mobile",
                    "as": "orders"
                  }},
                  { $unwind: "$orders"},

                  {$unwind:{path:"$orders.products",preserveNullAndEmptyArrays: true}},
                  
                  { $addFields: { createdDate: {$dateFromString: {dateString: "$orders.createdOn"} } } },
                  
                  {$project:{
                    
                      "retailerName":"$name",
                      "retailerMobile":"$mobile",
                      "laoOrderId":"$orders.laoOrderId",
                      "outletName":"$outletName",
                      "shopAddress":"$shopAddress",
                      "zipcode":"$zipcode",
                      "orderCreatedDate":{ $dateToString: { format: "%d-%m-%Y %H:%M", date: "$createdDate" } }, 
                      "orderValue":"$orders.grandTotal",
                      "products":"$orders.products",
                      "lastUpdatedStatus": { $slice: [ "$orders.products.status.message", -1 ] }
                   
                  }},

                  {$unwind:"$lastUpdatedStatus"}
          ]
      };
  
      let data = await service.makeHttpCall("post", "aggregate", postdata);
  
      return data.data.statusMessage;
    } catch (err) {
      return false;
    }
  
  };

  let getmyorderdetails = async(inputdata) => {
    try {

var postdata = {
  url: process.env.DB_URL,
  client: "LAO_Retailer_Details",
  docType: 1,
  query:   [

      {$match:{"mobile":inputdata}},
     // {$match:{"mobile":"7737924806"}},
      
      {$lookup:{
                "from": "LAO_Order",
                "localField": "mobile",
                "foreignField": "mobile",
                "as": "orders"
              }},
              { $unwind: "$orders"},
              
              { $addFields: { createdDate: {$dateFromString: {dateString: "$orders.createdOn"} } } },
              
              {$project:{
                
                  "retailerName":"$name",
                  "retailerMobile":"$mobile",
                  "laoOrderId":"$orders.laoOrderId",
                  "outletName":"$outletName",
                  "shopAddress":"$shopAddress",
                  "zipcode":"$zipcode",
                  "orderCreatedDate":{ $dateToString: { format: "%d-%m-%Y %H:%M", date: "$createdDate" } }, 
                  "orderValue":"$orders.grandTotal",
                  "products":"$orders.products",
               
              }}
      ]
};
//console.log("hai")
let data = await service.makeHttpCall("post", "aggregate", postdata);
//console.log(data)

//console.log("hai")

return data.data.statusMessage;
    } catch (err) {
      return false;
    }
  
  };


  let getupdatedetail = async(inputdata) => {
    try {

      var postdata = {
        url: process.env.DB_URL,
        client: "LAO_Order",
        docType: 1,
        query: [

          {$match:{"laoOrderId":inputdata.orderid}},

          ]
      };
  

      let data = await service.makeHttpCall("post", "aggregate", postdata);
  
      return data.data.statusMessage;
    } catch (err) {
      return false;
    }
  
  };


  let getdashboardstatuscount = async(inputdata) => {
    try {

      var postdata = {
        url: process.env.DB_URL,
        client: "LAO_Order",
        docType: 1,
        query: [

       {$match:{"products.wholesaler":inputdata}},
          
            { $unwind: "$products"},

            { $unwind: "$products.status"},
            
            {$group:{
                
              "_id":{ wholesaler:"$products.wholesaler",status:"$products.status.message"} ,
              "count":{$sum:1},
                
            }}
         
          ]
      };
  
      let data = await service.makeHttpCall("post", "aggregate", postdata);

      return data.data.statusMessage;
    } catch (err) {
      return false;
    }
  
  };

  let getdashboardproductcount = async(inputdata) => {
    try {

      var postdata = {
        url: process.env.DB_URL,
        client: "LAO_Products",
        docType: 1,
        query: [

          {$match:{"wholesaler":inputdata}},
          
          { $count: "productcount"},

          ]
      };
  
      let data = await service.makeHttpCall("post", "aggregate", postdata);

      return data.data.statusMessage;
    } catch (err) {
      return false;
    }
  
  };



  let getwholesaler = async(inputdata) => {
    try {

      var postdata = {
        url: process.env.DB_URL,
        client: "LAO_Wholesaler_Details",
        docType: 1,
        query: [

          {$match:{"mobile":inputdata}},
       
          ]
      };
  
      let data = await service.makeHttpCall("post", "aggregate", postdata);
  
      return data.data.statusMessage;
    } catch (err) {
      return false;
    }
  
  };

 // 

 let getSpecifiedOrder = async(inputdata) => {
  try {

    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Order",
      docType: 1,
      query: [

        {$match:{"laoOrderId":inputdata}},

    {
        $lookup:
        {
          from: 'LAO_Retailer_Details',
          localField: 'mobile',
          foreignField: 'mobile',
          as: 'Retailer_Details'
        }
    },
    
    {$unwind:"$Retailer_Details"},

        { "$project": 
               {      
                      "laoOrderId" : "$laoOrderId",
                      "Mobile" : "$mobile",
                      "retailerName" : "$Retailer_Details.name",
                      "retailerOutletName":"$Retailer_Details.outletName",
                      "retailerShopAddress":"$Retailer_Details.shopAddress",
                      "products" : "$products"
                }
          }
     
        ]
    };

    let data = await service.makeHttpCall("post", "aggregate", postdata);

    return data.data.statusMessage;
  } catch (err) {
    return false;
  }

};


module.exports = {
    getordercount,
    saveorder,
    getCart,
    addtocart,
    getorderdetails,
    getmyorderdetails,
    getupdatedetail,
    getdashboardstatuscount,
    getwholesaler,
    getdashboardproductcount,

    //
    getSpecifiedOrder
   
};
