const DB = require('../models/db');
const db = DB.getConnection();
// const menuModel = require('../models/menu_model');
const dt_global = require('./dt')
const ObjectId = require('mongodb').ObjectID

const dt = {
    getDesignItemData: (design_id, callback) => {
        if (design_id !== "undefined") {
            design_id = ObjectId(design_id)
        } 
        db.collection('t_design_item').aggregate([
            {
                $lookup: {
                    from: 'm_product',
                    localField: 'm_product_id',
                    foreignField: '_id',
                    as: 'list_product'
                }
            },
            {
                $match: {
                    is_delete: 0,
                    t_design_id: design_id
                }
            },
            {
                $unwind: '$list_product'
            },
            {
                $sort: {
                    'list-product.code': 1
                }
            }
        ]).toArray((err, doc) => {
            return callback(err, doc);
        })
    },
    // insertMenuData: (data, callback) => {
    //     let date = new Date();
    //     let dataObj = new menuModel(data);
    //     let bulan = date.getMonth() + 1
    //     if (bulan < 10) {
    //         bulan = '0' + bulan
    //     }
    //     dataObj.created_date = date.getDate() + '/' + bulan + '/' + date.getFullYear();
    //     dataObj.is_delete = 0;
    //     let prior = "ME"

    //     dt_global.getLength('m_menu', (err, length) => {
    //         length++
    //         if (length < 10) {
    //             dataObj.code = `${prior}000${length}`
    //         } else if (length < 100) {
    //             dataObj.code = `${prior}00${length}`
    //         } else if (length < 1000) {
    //             dataObj.code = `${prior}0${length}`
    //         } else {
    //             dataObj.code = `${prior}${length}`
    //         }
            
    //         db.collection('m_menu').insertOne(dataObj, (err, doc) => {
    //             return callback(err, doc);
    //         })
    //     })

    // },
    // updateMenuData: (data, callback) => {
    //     let dataObj = {};
    //     let date = new Date();
    //     let bulan = date.getMonth() + 1
    //     if (bulan < 10) {
    //         bulan = '0' + bulan
    //     }
    //     dataObj.code = data.code;
    //     dataObj.name = data.name;
    //     dataObj.controller = data.controller;
    //     dataObj.parent_id = data.parent_id;
    //     dataObj.updated_by = data.updated_by;
    //     dataObj.updated_date = date.getDate() + '/' + bulan + '/' + date.getFullYear();
    //     db.collection('m_menu').updateOne({
    //         code: dataObj.code
    //     }, {
    //         $set: dataObj
    //     }, (err, doc) => {
    //         return callback(err, doc);
    //     })
    // },
    // deleteMenuData: (data, callback) => {
    //     db.collection('m_menu_access').find({ $and: [{ m_menu_id: data.code }, { is_delete: 0 }] })
    //     .toArray((err, doc) => {
    //         if (doc.length != 0) {
    //             return callback(0, doc)
    //         } else {
    //             db.collection('m_menu').update({
    //                 code: data.code 
    //             }, {
    //                 $set: {
    //                     is_delete: 1
    //                 }
    //             }, doc => {
    //                 return callback(1, doc);
    //             })
    //         }
    //     })   
    // },
    // getAggrMenu: (data, cb) => {
    //     db.collection('m_menu_access').aggregate([
    //         {
    //             $lookup: {
    //                 from: 'm_menu',
    //                 localField: 'm_menu_id',
    //                 foreignField: 'code',
    //                 as: 'daftar_menu'
    //             }
    //         },
    //         {
    //             $unwind: '$daftar_menu'
    //         },
    //         {
    //             $match: {
    //                 'is_delete': 0,
    //                 'm_role_id': data.user_role
    //             }
    //         },
    //         {
    //             $project: {
    //                 code: '$m_menu_id',
    //                 role_id: '$m_role_id',
    //                 menu_name: '$daftar_menu.name',
    //                 controller: '$daftar_menu.controller',
    //                 parent_id: '$daftar_menu.parent_id'
    //             }
    //         },
    //         {
    //             $sort: {
    //                 'code': 1
    //             }
    //         }
    //     ])
    //     .toArray((err, doc) => {
    //         return cb(err, doc)
    //     })
    // }
    
}

module.exports = dt;