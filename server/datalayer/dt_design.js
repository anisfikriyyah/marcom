const DB = require('../models/db');
const db = DB.getConnection();
const designModel = require('../models/design_model');
const designItemModel = require('../models/design_item_model')

const dt = {
    getDesignData: (role_id, employee_id, callback) => {
        db.collection('t_design').aggregate([
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
                $lookup: {
                    from: 'm_user',
                    localField: 'created_by',
                    foreignField: '_id',
                    as: 'dt_user'
                }
            },
            {
                $unwind: '$dt_user'
            },
            {
                $lookup: {
                    from: 'm_employee',
                    localField: 'dt_user.m_employee_id',
                    foreignField: 'employee_number',
                    as: 'employee'
                }
            },
            {
                $unwind: '$employee'
            },
            {
                $sort: {
                    code: 1
                }
            }
        ])
        .toArray((err, doc) => {
            db.collection('m_user').findOne({ m_employee_id: employee_id }
                , (err, emp_doc) => {
                    let tmp = []
                    if (role_id === "RO0001") {
                        tmp = doc
                    } else {
                        for (let key = 0; key < doc.length; key++) {
                            // console.log(`nomor ${key}: role = ${role_id}, assign to ${doc[key].assign_to} = ${employee_id}, status = ${doc[key].status}, created by ${doc[key].created_by}=${emp_doc._id}`)
                            // console.log(`nomor ${key}: role = ${role_id}, created by ${doc[key].created_by}=${emp_doc._id}`)
                            if (role_id === "RO0002" && doc[key].assign_to === employee_id && doc[key].status === 2) {
                                tmp.push(doc[key])
                            }
                            if (role_id === "RO0003" && String(doc[key].created_by) == String(emp_doc._id)) {
                                tmp.push(doc[key])
                                // console.log(doc[key])
                            }
                        }
                    }
                    // console.log(tmp)
                    tmp.map((el, key) => {
                        tmp[key].dt_user = ''
                        tmp[key].employee = `${el.employee.first_name} ${el.employee.last_name}`
                        tmp[key].statusMessage = el.t_status.status
                    })
                    // console.log(tmp)
                    return callback(err, tmp)
            })
        })
    },
    insertDesignData: (data, callback) => {
        let dataDesignItemObj = [], dataDesignObj = new designModel(data.design)
        let item = data.design_item
        let date = new Date();
        let hari = date.getDate()
        let bulan = date.getMonth() + 1
        if (bulan < 10) {
            bulan = '0' + bulan
        }
        let tahun = date.getFullYear()
        let tanggal = hari + '/' + bulan + '/' + tahun
        dataDesignObj.created_date = tanggal;
        dataDesignObj.is_delete = 0

        for (let i=0; i<item.length; i++) {
            item[i].is_delete = 0
            item[i].created_date = tanggal
            dataDesignItemObj[i] = new designItemModel(item[i]);
        }
        
        db.collection('t_design').insertOne(dataDesignObj, () => {
            let _id = dataDesignObj._id
            dataDesignItemObj.map(el => {
                el.t_design_id = _id
            })
            db.collection('t_design_item').insertMany(dataDesignItemObj, (err, doc) => {
                return callback(err, doc);
            })
        })
    },
    updateDesignData: (data, callback) => {
        let date = new Date();
        let bulan = date.getMonth() + 1
        if (bulan < 10) {
            bulan = '0' + bulan
        }
        let dataObj = data
        dataObj.updated_date = date.getDate() + '/' + bulan + '/' + date.getFullYear();

        db.collection('t_design').updateOne({
            code: dataObj.code
        }, {
            $set: dataObj
        }, (err, doc) => {
            return callback(err, doc);
        })
    },
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