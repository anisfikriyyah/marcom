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
    getEmployeeData: (code, callback) => {
        db.collection('m_employee').findOne({employee_number: code}, (err, doc) => {
            let fullname = doc.first_name + ' ' + doc.last_name
            return callback(err, fullname);
        })
    }
}

module.exports = dt;