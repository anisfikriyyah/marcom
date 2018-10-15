const responseHelper = require('../helpers/responseHelper');
const dt_company = require('../datalayer/dt_company')

const CompanyBL = {
    getCompanyDocLength: (req, res, next) => {
        dt_company.getLength(function (items) {
            // responseHelper.sendResponse(res, 200, items);
            // console.log(items)
        })
    },

    InsertCompanyHandler: (req, res, next) => {
        let data = req.body
        dt_company.insertCompanyData(data, function(items) {
            responseHelper.sendResponse(res, 200, items);
        })
    },
}

module.exports = CompanyBL