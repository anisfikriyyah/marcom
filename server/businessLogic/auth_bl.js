const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const responseHelper = require('../helpers/responseHelper');
const authConfig = require('../configs/auth_config.json');
const dt = require('../datalayer/dt');

const AuthBL = {
    loginHandler: (req, res, next) => {
        if (!req.body.username || !req.body.password) {
            responseHelper.sendResponse(res, 404, 'Data tidak terkirim');
        } else {
            dt.getUserData(req.body.username, function(err, doc) {
                if (doc) {
                    if (bcrypt.compareSync(req.body.password, doc.password)) {
                        let token = jwt.sign(doc, authConfig.secretkey);

                        delete doc.password;
                        let data = {
                            userdata: doc,
                            token: token
                        }
                        responseHelper.sendResponse(res, 200, data);
                    } else {
                        responseHelper.sendResponse(res, 404, 'Password tidak sesuai');
                    }
                } else {
                    responseHelper.sendResponse(res, 404, 'Username tidak ditemukan');
                }
            })
        }
    }
}

module.exports = AuthBL;
