const DB = require('../models/db');
const db = DB.getConnection();
const menuModel = require('../models/menu_model');

const dt = {
    getMenuData: (callback) => {
        db.collection('m_menu').find({ is_delete: 0 }).sort({code: 1})
        .toArray((err, doc) => {
            return callback(err, doc);
        })
    },
    insertMenuData: (data, callback) => {
        let date = new Date();
        let dataObj = new menuModel(data);
        dataObj.created_date = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
        dataObj.is_delete = 0;
        
        db.collection('m_menu').insertOne(dataObj, (err, doc) => {
            return callback(err, doc);
        })
    },
    updateMenuData: (data, callback) => {
        let dataObj = {};
        let date = new Date();
        dataObj.code = data.code;
        dataObj.name = data.name;
        dataObj.controller = data.controller;
        dataObj.parent_id = data.parent_id;
        dataObj.updated_by = data.updated_by;
        dataObj.updated_date = date.getDate() + '/' + (Number(date.getMonth()) + 1) + '/' + date.getFullYear();
        db.collection('m_menu').updateOne({
            code: dataObj.code
        }, {
            $set: dataObj
        }, (err, doc) => {
            return callback(err, doc);
        })
    },
    deleteMenuData: (data, callback) => {
        db.collection('m_menu').update({
            code: data.code
        }, {
            $set: {
                is_delete: 1
            }
        }, (err, doc) => {
            return callback(err, doc);
        })
    },
}

module.exports = dt;