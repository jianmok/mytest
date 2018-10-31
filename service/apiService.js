const registerService = require("../service/registerService");
const docOptionService = require("../service/docOptionService");
module.exports = {
    registerService:new registerService(),
    docOptionService:new docOptionService(),
}