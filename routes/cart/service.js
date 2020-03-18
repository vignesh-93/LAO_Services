const service = require("../../lib/http/invoke");
var MongoClient = require("mongodb").MongoClient;
 
  ObjectId = require("mongodb").ObjectID;


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


let viewCart = async(inputData) => {
  try {


    var toQueryData = [];

    if (inputData.userId == null || inputData.userId == undefined || inputData.userId == "" ) {}
    else{
      toQueryData.push({ "userId": inputData.userId })
    }

    if (inputData.mobile == null || inputData.mobile == undefined || inputData.mobile == "" ) {}
    else{
      toQueryData.push({ "mobile": inputData.mobile })
    }

    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Cart",
      docType: 1,
      query: [
   
        { $match: { status:"Active" }},

        { $match: { $and: toQueryData } },

        
        
       { $addFields: { createdDate: {$dateFromString: {dateString: "$createdOn" } } } },

        {$project:{
          "name":"$name",
          "sku":"$sku",
          "price":"$price",
          "qty":"$qty",
          "totalPrice":"$totalPrice",
          "image":"$image",
          "wholesaler":"$wholesaler",
         // "details":"$wholesalerdetails",
          "CreatedOn":{ $dateToString: { format: "%d-%m-%Y %H:%M", date: "$createdDate" } },   
        }}
    ]
    };

    let data = await service.makeHttpCall("post", "aggregate", postdata);

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
      query: {"_id": ObjectID(id)}
    
    }

    let data = await service.makeHttpCall("post", "read", postdata);

    return data.data.statusMessage;
  } catch (err) {
    return false;
  }

};


let checkcart = async(sku,mobile) => {
  try {

    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Cart",
      docType: 0,
      query: {"sku": sku,"status":"Active",mobile:mobile}
    
    }

    let data = await service.makeHttpCall("post", "read", postdata);

    return data.data.statusMessage;
  } catch (err) {
    return false;
  }

};


let getwholesaleraddress = async(id) => {
  try {

    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Wholesaler_Details",
      docType: 0,
      query: {"_id": ObjectId(id)}
    
    }

    let data = await service.makeHttpCall("post", "read", postdata);

    return data.data.statusMessage;
  } catch (err) {
    return false;
  }

};


module.exports = {
    addtocart,
    viewCart,
    getCart,
    checkcart,
    getwholesaleraddress
    
};
