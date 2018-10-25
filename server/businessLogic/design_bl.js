const responseHelper = require('../helpers/responseHelper');
const dt_design = require('../datalayer/dt_design')
const dt_design_item = require('../datalayer/dt_design_item')

const DesignBL = {
    getDesignHandler: (req, res, next) => {
        let role_id = req.params.role_id
        let employee_id = req.params.employee_id
        dt_design.getDesignData(role_id, employee_id, (err, items) => {
            responseHelper.sendResponse(res, 200, items);
        })
    },
    insertDesignHandler: (req, res, next) => {
        let data = req.body
        dt_design.insertDesignData(data, function(err, items) {
            responseHelper.sendResponse(res, 200, items);
        })
    },
    updateDesignHandler: (req, res, next) => {
        let data = req.body
        dt_design.updateDesignData(data, function(err, items) {
            if (err) {
                responseHelper.sendResponse(res, 304, err);
            } else {
                responseHelper.sendResponse(res, 200, items);
            }
        })
    },
    deleteMenuHandler: (req, res, next) => {
        let data = req.body
        dt_menu.deleteMenuData(data, function(status, items) {
            if (status === 0) {
                responseHelper.sendResponse(res, 304, items);
            } else {
                responseHelper.sendResponse(res, 200, items);
            }
        })
    },
    getAggrMenuHandler: (req, res, next) => {
        let data = req.body
        dt_menu.getAggrMenu(data, (status, items) => {
            responseHelper.sendResponse(res, 200, items)
        })
    },

    getDesignItemHandler: (req, res, next) => {
        let design_id = req.params.design_id
        dt_design_item.getDesignItemData(design_id, (err, items) => {
            responseHelper.sendResponse(res, 200, items)
        })
    }
}

module.exports = DesignBL