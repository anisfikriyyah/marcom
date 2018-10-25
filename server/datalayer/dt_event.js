const DB = require('../models/db');
const db = DB.getConnection();
// const designModel = require('../models/design_model');
// const dt_global = require('./dt')

const dt = {
    getEventData: (callback) => {
        db.collection('t_event').aggregate([
            {
                $lookup: {
                    from: 'detail_status',
                    localField: 'status',
                    foreignField: 'code',
                    as: 't_status'
                }
            },
            {
                $unwind: '$t_status'
            },
            {
                $match: {
                    is_delete: 0,
                    status: 2
                }
            },
            {
                $sort: {
                    code: 1
                }
            }
        ])
        .toArray((err, doc) => {
            return callback(err, doc)
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
    // updateDesignData: (data, callback) => {
    //     let date = new Date();
    //     let bulan = date.getMonth() + 1
    //     if (bulan < 10) {
    //         bulan = '0' + bulan
    //     }
    //     let dataObj = data
    //     dataObj.updated_date = date.getDate() + '/' + bulan + '/' + date.getFullYear();

    //     db.collection('t_design').updateOne({
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