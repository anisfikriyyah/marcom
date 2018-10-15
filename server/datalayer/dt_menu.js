const DB = require('../models/db');
const db = DB.getConnection();
const menuModel = require('../models/menu_model');

const dt = {
    getMenuData: (callback) => {
        db.collection('m_menu').find({ is_delete: 0 })
        .toArray((err, doc) => {
            return callback(doc);
        })
    },
    insertMenuData: (data, callback) => {
        let dataObj = new menuModel(data)
        dataObj.created_date = new Date();
        dataObj.is_delete = 0;
        
        db.collection('m_menu').insertOne(dataObj, (err, doc) => {
            return callback(err, doc);
        })
    },
    updateMenuData: (data, callback) => {
        let dataObj = {}
        dataObj.code = data.code_edit
        dataObj.name = data.name_edit
        dataObj.controller = data.controller_edit
        dataObj.parent_id = data.parent_id_edit
        dataObj.updated_by = data.updated_by
        dataObj.updated_date = new Date()
        
        db.collection('m_menu').update({
            code: dataObj.code
        },{
            $set: dataObj
        }, (err, doc) => {
            return callback(err, doc);
        })
    },
    deleteCompanyData: (data, callback) => {
        db.collection('m_menu').update({
            code : data.code
        }, {
            $set : {
                is_delete: 1
            }
        }, (err, doc) => {
            return callback(err, doc);
        })
    },
}

module.exports = dt;