const MongoClient = require('mongodb').MongoClient
const dbconfig = require('../configs/db_config.json').mlab
var conn = null;

const DatabaseConnection = {
    connect: (cb) => {
        let url = dbconfig.host + ':' + dbconfig.port + '/' + dbconfig.dbname;
        MongoClient.connect(url, (err, db) => {
            if (!err) {
                conn = db.db(dbconfig.dbname);
            }
            cb(err, db);
        })
    },
    getConnection: () => {
        return conn;
    }
}

module.exports = DatabaseConnection;