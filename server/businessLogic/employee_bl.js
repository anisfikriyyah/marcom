const responseHelper = require('../helpers/responseHelper');
const dt_employee = require('../datalayer/dt_employee')

const EmployeeBL = {
    getEmployeeHandler: (req, res, next) => {
        let data = req.params.code
        dt_employee.getEmployeeData(data, (err, items) => {
            if (err) {
                responseHelper.sendResponse(res, 200, err)
            } else {
                responseHelper.sendResponse(res, 200, items)
            }
        })
    }
}

module.exports = EmployeeBL