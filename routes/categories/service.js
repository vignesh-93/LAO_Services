const service = require("../../lib/http/invoke");


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


let getCategories = async(wholesaler,parent) => {
  try {

    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Categories",
      docType: 1,
      query:
      [

        { $match: { parent:parent }},
        { $match: { status:"Active" }},
        { $match: { wholesaler:wholesaler}},
   
       { "$group": {
           "_id": {
               "group": "$group",
               "id":"$_id",
               "name": "$name",
               "image" : "$image",
           },
          
       }},
       { "$group": {
           "_id": "$_id.group",
           "categories": { 
               "$push": { 
                   "_id":"$_id.id",
                   "name": "$_id.name",
                   "image": "$_id.image"
               },
           },
   
       }},
       
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
              {$project:{
                "name":"$name",
                "image":"$image"    
              }}
    ]
    };

    let data = await service.makeHttpCall("post", "aggregate", postdata);

    return data.data.statusMessage;
  } catch (err) {
    return false;
  }

};





module.exports = {
  getCategories,
  getWholesaler,
  getSubCategories
    
};
