const responseHelper = require('../helpers/responseHelper');
const dt_user = require('../datalayer/dt_user')

const UserBL = {
    getUserHandler: (req, res, next) => {
        dt_user.getUserData(function (items) {
            responseHelper.sendResponse(res, 200, items);
        })
    },

    InsertUserHandler: (req, res, next) => {
        let data = req.body
        dt_user.insertUserData(data, function(items) {
            responseHelper.sendResponse(res, 200, items);
        })
    },
}

module.exports = UserBL