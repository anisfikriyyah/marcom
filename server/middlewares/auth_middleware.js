const jwt = require('jsonwebtoken')
const authconfig = require('../configs/auth_config.json')
const ResponseHelper = require('../helpers/responseHelper')

module.exports = {
    checkToken: (req, res, next) => {
        if (!req.headers.authorization) {
            ResponseHelper.sendResponse(res, 403, 'You are not authorized')
        } else {
            let token = req.headers.authorization
            jwt.verify(token, authconfig.secretkey, (err, decoded) => {
                if (decoded == undefined) {
                    ResponseHelper.sendResponse(res, 403, 'You are not authorized')
                } else {
                    req.userdata = decoded
                    next()
                }
            })
        } 
    }
}
