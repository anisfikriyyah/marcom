const responseHelper = require('../helpers/responseHelper');
const dt = require('../datalayer/dt')

const GlobalBL = {
    getColLength: (req, res, next) => {
        let colName = req.params.colName
        dt.getLength(colName, function (err, items) {
            responseHelper.sendResponse(res, 200, items);
        })
    },
}

module.exports = GlobalBL