const responseHelper = require('../helpers/responseHelper');
const dt_event = require('../datalayer/dt_event')

module.exports = Event = {
    getEventHandler: (req, res, next) => {
        dt_event.getEventData((err, items) => {
            responseHelper.sendResponse(res, 200, items);
        })
    },
    // insertMenuHandler: (req, res, next) => {
    //     let data = req.body
    //     dt_menu.insertMenuData(data, function(err, items) {
    //         responseHelper.sendResponse(res, 200, items);
    //     })
    // },
    // updateDesignHandler: (req, res, next) => {
    //     let data = req.body
    //     dt_design.updateDesignData(data, function(err, items) {
    //         if (err) {
    //             responseHelper.sendResponse(res, 304, err);
    //         } else {
    //             responseHelper.sendResponse(res, 200, items);
    //         }
    //     })
    // },
    // deleteMenuHandler: (req, res, next) => {
    //     let data = req.body
    //     dt_menu.deleteMenuData(data, function(status, items) {
    //         if (status === 0) {
    //             responseHelper.sendResponse(res, 304, items);
    //         } else {
    //             responseHelper.sendResponse(res, 200, items);
    //         }
    //     })
    // },
    // getAggrMenuHandler: (req, res, next) => {
    //     let data = req.body
    //     dt_menu.getAggrMenu(data, (status, items) => {
    //         responseHelper.sendResponse(res, 200, items)
    //     })
    // },

    // getDesignItemHandler: (req, res, next) => {
    //     let design_id = req.params.design_id
    //     dt_design_item.getDesignItemData(design_id, (err, items) => {
    //         responseHelper.sendResponse(res, 200, items)
    //     })
    // }
}