const responseHelper = require('../helpers/responseHelper');
const dt_menu = require('../datalayer/dt_menu')

const MenuBL = {
    getMenuHandler: (req, res, next) => {
        dt_menu.getMenuData((err, items) => {
            responseHelper.sendResponse(res, 200, items);
        })
    },
    insertMenuHandler: (req, res, next) => {
        let data = req.body
        dt_menu.insertMenuData(data, function(err, items) {
            responseHelper.sendResponse(res, 200, items);
        })
    },
    updateMenuHandler: (req, res, next) => {
        let data = req.body
        dt_menu.updateMenuData(data, function(err, items) {
            responseHelper.sendResponse(res, 200, items);
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
    }
}

module.exports = MenuBL