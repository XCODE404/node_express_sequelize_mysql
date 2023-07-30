const moment = require("moment/moment");
const { RESPONSE_MESSAGE } = require("./constants");

module.exports.UserAgent = async (agent) => {
    return {
        browser: agent.browser,
        version: agent.version,
        os: agent.os,
        platform: agent.platform,
        isMobile: agent.isMobile,
        isBot: agent.isBot
    }
}

module.exports.TodayDate = async () => moment().format('YYYY-MM-DD');

module.exports.FormatData = (data) => {
    if (data) {
        return { data };
    } else {
        throw new Error(RESPONSE_MESSAGE.DATA_NOT_FOUND);
    }
}