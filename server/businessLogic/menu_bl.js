const responseHelper = require('../helpers/responseHelper');
const dt_menu = require('../datalayer/dt_menu')

const MenuBL = {
    getMenuHandler: (req, res, next) => {
        dt_menu.getMenuData(items => {
            responseHelper.sendResponse(res, 200, items);
        })
    },
    insertMenuHandler: (req, res, next) => {
        let data = req.body
        dt_menu.insertMenuData(data, function(items) {
            responseHelper.sendResponse(res, 200, items);
        })
    },
    updateMenuHandler: (req, res, next) => {
        let data = req.body
        dt_menu.updateMenuData(items => {
            responseHelper.sendResponse(res, 200, items);
        })
    },
    deleteMenuHandler: (req, res, next) => {
        let data = req.body
        dt_menu.deleteMenuData(data, function(items) {
            responseHelper.sendResponse(res, 200, items);
        })
    },
}

module.exports = MenuBL