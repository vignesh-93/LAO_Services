const service = require("../../lib/http/invoke");
const ObjectID = require("mongodb").ObjectID;

var datetime = new Date();

let saveDetails = async retailerData => {
  try {

    retailerData.status="Active";
    retailerData.createdOn=datetime
    

    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Retailer_Details",
      docType: 0,
      query: retailerData
    };

    let data = await service.makeHttpCall("post", "write", postdata);

    return data.data.statusMessage; 
  } catch (err) {

    return false;
  }

};


let checkRetailer = async(inputData) => {
  try {

    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Retailer_Details",
      docType: 1,
      query: [
                { $match: { mobile:inputData }},

            ]
    };

    let data = await service.makeHttpCall("post", "aggregate", postdata);

    return data.data.statusMessage;
  } catch (err) {
    return false;
  }

};


let loginRetailer = async loginData => {
  try {

  
    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Retailer_Details",
      docType: 1,
      query: [

        {$match:{mobile:loginData.email}},
        {$match:{password:loginData.password}},
        
        
        
        ]
    };

    let data = await service.makeHttpCall("post", "aggregate", postdata);

    return data.data.statusMessage;
  } catch (err) {

    return false;
  }

};

module.exports = {
    saveDetails,
    checkRetailer,
    loginRetailer
};
