const DB = require('../models/db');
const db = DB.getConnection();
const companyModel = require('../models/company_model');

const dt = {
    getLength: (callback) => {
        db.collection('m_company').aggregate([
            { $group: { _id: null, n: { $sum: 1 } } }
        ]).toArray((err, doc) => {
            return callback(doc);
        })
    },
    insertCompanyData: (data, callback) => {
        let dataObj = new companyModel(data)
        dataObj.created_date = new Date();
        dataObj.is_delete = 0;
        
        db.collection('m_company').insertOne(dataObj, (err, doc) => {
            return callback(err, doc);
        })
    },
}

module.exports = dt;