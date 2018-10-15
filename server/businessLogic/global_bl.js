const responseHelper = require('../helpers/responseHelper');
const dt = require('../datalayer/dt')

const GlobalBL = {
    getDocLength: (req, res, next) => {
        let docName = req.params.docName
        dt.getLength(docName, function (err, items) {
            responseHelper.sendResponse(res, 200, items);
        })
    },
}

module.exports = GlobalBL