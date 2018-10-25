const responseHelper = require('../helpers/responseHelper');
const dt = require('../datalayer/dt')

const GlobalBL = {
    getColLength: (req, res, next) => {
        let colName = req.params.colName
        dt.getLength(colName, function (err, items) {
            responseHelper.sendResponse(res, 200, items);
        })
    },
    getStaffHandler: (req, res, next) => {
        dt.getStaffData('RO0002', (err, items) => {
            if (err) {
                responseHelper.sendResponse(res, 200, err)
            } else {
                responseHelper.sendResponse(res, 200, items)
            }
        })
    }
}

module.exports = GlobalBL