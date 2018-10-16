const DB = require('../models/db');
const db = DB.getConnection();

const dt = {
    getLength: (colName, callback) => {
        db.collection(colName).countDocuments({}, (err, doc) => {
            return callback(err, doc);
        })
    },
    getUserData: (username, callback) => {
        db.collection('m_user').findOne({
            username: username
        }, (err, doc) => {
            return callback(err, doc);
        })
    },
}

module.exports = dt;