const service = require("../../../lib/http/invoke");
const ObjectID = require("mongodb").ObjectID;

var datetime = new Date();

let getLanguange = async() => {
  try {

    var postdata = {
      url: process.env.DB_URL,
      client: "LAO_Languange",
      docType: 1,
      query: [
                { $match: { status:"Active" }},

                {$project:{
                "name":"$name",
                "code":"$code"
                }}
            ]
    };

    let data = await service.makeHttpCall("post", "aggregate", postdata);

    return data.data.statusMessage;
  } catch (err) {
    return false;
  }

};

let getWholesaler = async() => {
    try {
  
      var postdata = {
        url: process.env.DB_URL,
        client: "LAO_Wholesaler_Details",
        docType: 1,
        query: [
                  { $match: { status:"Active" }},
  
                  {$project:{
                  "name":"$name",
                  "mobile":"$mobile"
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
    getLanguange,
    getWholesaler
};
