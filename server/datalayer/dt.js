const DB = require('../models/db');
const db = DB.getConnection();

const dt = {
    getLength: (docName, callback) => {
        db.collection(docName).countDocuments({}, (err, doc) => {
            return callback(err, doc);
        })
    },
    getUserData: (username, callback) => {
        db.collection('m_user').findOne({
            username: username
        }, (err, doc) => {
            return callback(err, doc);
        })
    }
}

module.exports = dt;