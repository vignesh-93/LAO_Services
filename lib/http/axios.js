let instance = {
  baseURL: process.env.DATA_SERVICE_ENDPOINT,
  timeout: 50000000,
  headers: { "Content-Type": "application/json" }
};
let instanceFynd = {
  baseURL: process.env.FYND_API_BASE,
  timeout: 50000000,
  headers: {
    "Content-Type": "application/json",
    "Fynd-Affiliate-Id": "e04b680f",
    "Fynd-Affiliate-Token": "be8096c3-84e7-479d-a6b8-1d62826bff86"
  }
};
let instanceBoonbox = {
  baseURL: process.env.IN_3_API,
  timeout: 50000000,
  headers: {
    "Content-Type": "application/json",
    "API-Id": "GHY897HJUT",
    "Username": "champ.user",
    "Consumer-Token":"hdf78-jj8s9-7yxej3-983jj"
  }
};
module.exports = {
  instance,
  instanceFynd,
  instanceBoonbox
};
