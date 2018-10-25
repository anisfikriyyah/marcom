const DB = require('../models/db');
const db = DB.getConnection();

const dt = {
    getLength: (docName, callback) => {
        if (docName != 't_design') {
            db.collection(docName).countDocuments({}, (err, doc) => {
                return callback(err, doc);
            })
        } else {
            let date = new Date()
            let hari = date.getDate()
            let bulan = date.getMonth()+1
            if (bulan < 10) {
                bulan = '0' + bulan
            }
            let tahun = date.getFullYear()
            let tanggal = hari+'/'+bulan+'/'+tahun
            db.collection(docName).countDocuments({created_date: tanggal}, (err, doc) => {
                return callback(err, doc);
            })
        }
    },
    getUserData: (username, callback) => {
        db.collection('m_user').findOne({
            username: username
        }, (err, doc) => {
            return callback(err, doc);
        })
    },
    getStaffData: (role_id, callback) => {
        if (!role_id) {
            role_id = 'RO0002'
        }
        db.collection('m_user').aggregate([
            {
                $lookup: {
                    from: 'm_employee',
                    localField: 'm_employee_id',
                    foreignField: 'employee_number',
                    as: 'm_employee'
                }
            },
            {
                $match: {
                    m_role_id: role_id,
                    is_delete: 0
                }
            },
            {
                $unwind: '$m_employee'
            },
            {
                $project: {
                    username: '$username',
                    role_id: '$m_role_id',
                    employee_id: '$m_employee_id',
                    first_name: '$m_employee.first_name',
                    last_name: '$m_employee.last_name'
                }
            }
        ])
        .toArray((err, doc) => {
            doc.map((el, keys) => {
                el.fullname = el.first_name + ' ' + el.last_name
            })
            return callback(err, doc);
        })
    },
}

module.exports = dt;