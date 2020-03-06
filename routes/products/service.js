const service = require("../../lib/http/invoke");

var MongoClient = require("mongodb").MongoClient;
 
  ObjectId = require("mongodb").ObjectID;


var datetime = new Date();

let getWholesaler = async(mobile) => {
    try {
  
      var postdata = {
        url: process.env.DB_URL,
        client: "LAO_Wholesaler_Details",
        docType: 1,
        query: [
          { $match: { status:"Active" }},
          { $match: { "mobile":mobile }},
          {$project:{
              "name":"$name"
              }}
          ]
      };
  
      let data = await service.makeHttpCall("post", "aggregate", postdata);
  
      return data.data.statusMessage;
    } catch (err) {
      return false;
    }
  
  };

let getProducts = async(wholesaler,category,languange,start,end) => {
  try {

    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Products",
      docType: 1,
      query: [
        
            { $unwind: "$languangeData" },
            { $match: { status:"Active" }},
            { $match: { "languangeData.code":languange }},
            { $match: { "category":category }},
            { $match: { wholesaler:wholesaler }},
            
             { $skip : start},
             { $limit : end },
            
            {$project:{
                "sku":"$sku",
                "name":"$languangeData.name",
                "description":"$languangeData.description",
                "price":"$price",
                "image":"$languangeData.image",
                "wholesaler":"$wholesaler",
                "gst":"$gst",
                "size":"$size"
                }}
            ]
    };

    let data = await service.makeHttpCall("post", "aggregate", postdata);

    return data.data.statusMessage;
  } catch (err) {
    return false;
  }

};

let getQuickCart = async(wholesaler,productname,languange,start,end) => {
  try {

    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Products",
      docType: 1,
      query: [
        
            { $unwind: "$languangeData" },
            { $match: { status:"Active" }},
            { $match: { "languangeData.code":languange }},
            // { $match: { "languangeData.name":productname }},
            { $match:  {"languangeData.name" : {$regex : ".*"+productname+".*"}}  },
            { $match: { wholesaler:wholesaler }},
            
             { $skip : start},
             { $limit : end },
            
            {$project:{
                "sku":"$sku",
                "name":"$languangeData.name",
                "description":"$languangeData.description",
                "price":"$price",
                "image":"$languangeData.image",
                "wholesaler":"$wholesaler",
                "gst":"$gst",
                "size":"$size"
                
                }}
            ]
    };

    let data = await service.makeHttpCall("post", "aggregate", postdata);

    return data.data.statusMessage;
  } catch (err) {
    return false;
  }

};


let getallProducts = async(wholesaler,languange,start,end) => {
  try {

    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Products",
      docType: 1,
      query: [
        
            { $unwind: "$languangeData" },
            { $match: { status:"Active" }},
            { $match: { "languangeData.code":languange }},
            // { $match: { "languangeData.name":productname }},
         //   { $match:  {"languangeData.name" : {$regex : ".*"+productname+".*"}}  },
            { $match: { wholesaler:wholesaler }},
            
             { $skip : start},
             { $limit : end },
            
            {$project:{
                "sku":"$sku",
                "name":"$languangeData.name",
                "description":"$languangeData.description",
                "price":"$price",
                "image":"$languangeData.image",
                "wholesaler":"$wholesaler",
                "gst":"$gst",
                "size":"$size"
                
                }}
            ]
    };

    let data = await service.makeHttpCall("post", "aggregate", postdata);

    return data.data.statusMessage;
  } catch (err) {
    return false;
  }

};

let getSubCategories = async(wholesaler,parent) => {
  try {

    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Categories",
      docType: 1,
      query:[
        { $match: { parent:parent }},
        { $match: { status:"Active" }},
        { $match: { wholesaler:wholesaler }},
        
        
        {  $lookup: {
              "from": "LAO_Products",
              "localField": "parent",
              "foreignField": "category",
              "as": "products"
        }  },

        {$addFields:{ size_of_products: {$size: "$products"}}},
        
        { $match: {"size_of_products": {$gt: 0} }},

        {$limit:1},

        {$project:{
                 "name":"$name",
                  
              }}
    ]
    };

    let data = await service.makeHttpCall("post", "aggregate", postdata);

    return data.data.statusMessage;
  } catch (err) {
    return false;
  }

};


let getWholesalerProducts = async(wholesaler,languange,start,end) => {
  try {

    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Products",
      docType: 1,
      query: [
        
            { $unwind: "$languangeData" },
            { $match: { status:"Active" }},
            { $match: { "languangeData.code":languange }},
          
            { $match: { wholesaler:wholesaler }},
            
            //  { $skip : start},
            //  { $limit : end },
            
            {$project:{
                "sku":"$sku",
                "name":"$languangeData.name",
                "description":"$languangeData.description",
                "price":"$price",
                "image":"$languangeData.image",
                "wholesaler":"$wholesaler",
                "gst":"$gst",
                "size":"$size"
                }}
            ]
    };

    let data = await service.makeHttpCall("post", "aggregate", postdata);

    return data.data.statusMessage;
  } catch (err) {
    return false;
  }

};

let getProduct = async(sku) => {
  try {

    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Products",
      docType: 1,
      query: [
        
            { $match: { sku:sku }},
           
            ]
    };

    let data = await service.makeHttpCall("post", "aggregate", postdata);

    return data.data.statusMessage;
  } catch (err) {
    return false;
  }

};


let updateProduct = async productData => {
  try {

    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Products",
      docType: 0,
      query: productData
    };

    let data = await service.makeHttpCall("post", "write", postdata);

    return data.data.statusMessage;
  } catch (err) {

    return false;
  }

};

module.exports = {
    getWholesaler,
    getProducts,
    getQuickCart,
    getSubCategories,
    getallProducts,
    getWholesalerProducts,
    getProduct,
    updateProduct
    
};
