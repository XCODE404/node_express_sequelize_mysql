// Import the required modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment/moment");
const { RESPONSE_MESSAGE, RESPONSE_STATUS_CODE } = require("./constants");
const { ThrowError } = require("./errors/app-errors");

module.exports.UserAgent = async (agent) => {
    return {
        browser: agent.browser,
        version: agent.version,
        os: agent.os,
        platform: agent.platform,
        isMobile: agent.isMobile,
        isBot: agent.isBot
    }
};

module.exports.Response = (res, { 
    message = RESPONSE_MESSAGE.SUCCESS,
    status = RESPONSE_STATUS_CODE.OK, data = null } = {}
    ) => {
    res.status(status).json({
        status: true,
        message: message,
        data: data,
    });
};

module.exports.TodayDate = async () => moment().format('YYYY-MM-DD');

module.exports.FormatData = (data) => {
    if (data) {
        return { data };
    } else {
        throw new Error(RESPONSE_MESSAGE.DATA_NOT_FOUND);
    }
};

module.exports.ValidateSignature = async (req) => {
    try {
        const signature = req.get("Authorization");
        const payload = await jwt.verify(signature.split(" ")[1], process.env.ACCESS_TOKEN_SECERT);
        req.user = payload;
        return true;
    } catch (error) {
        return false;
    }
};

module.exports.DuplicateData = async (data) => {
    if (data && data != null && data.length != 0) {
        throw new ThrowError(RESPONSE_MESSAGE.ALREADY_EXIST);
    }
}

module.exports.IsError = async (result) => result.hasOwnProperty('error');

module.exports.CapitalizeFirstLetter = (txt) => txt.charAt(0).toUpperCase() + txt.slice(1);

module.exports.EncodePassword = async (password) => bcrypt.hashSync(password, 10);

module.exports.ComparePassword = async (password, hashPassword) => bcrypt.compareSync(password, hashPassword);

module.exports.MakeToken = async (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_SECERT, { expiresIn: 86400 }); // 24 hour

module.exports.DecodeToken = async (token) => jwt.decode(token, process.env.ACCESS_TOKEN_SECERT);