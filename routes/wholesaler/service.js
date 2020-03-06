const service = require("../../lib/http/invoke");
const ObjectID = require("mongodb").ObjectID;

var datetime = new Date();

let saveDetails = async wholesalerData => {
  try { 

    wholesalerData.status="Active";
    wholesalerData.createdOn=datetime
    

    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Wholesaler_Details",
      docType: 0,
      query: wholesalerData
    };

    let data = await service.makeHttpCall("post", "write", postdata);

    return data.data.statusMessage;
  } catch (err) { 

    return false;
  }

};


let checkWholesaler = async(inputData) => {
  try {

    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Wholesaler_Details",
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



module.exports = {
    saveDetails,
    checkWholesaler
};
