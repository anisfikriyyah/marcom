const ObjectID = require('mongodb').ObjectID

function DesignItem(data) {
    this._id = data._id;
    this.t_design_id = data.t_design_id;
    this.m_product_id = ObjectID(data.m_product_id);
    this.title_item = data.title_item;
    this.request_pic = data.request_pic;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
    this.request_due_date = data.request_due_date;
    this.note = data.note;
    this.is_delete = data.is_delete;
    this.created_by = data.created_by === "undefined" ? data.created_by : ObjectID(data.created_by);
    this.created_date = data.created_date;
    this.updated_by = data.updated_by === "undefined" ? data.updated_by : ObjectID(data.updated_by);
    this.updated_date = data.updated_date;
}

DesignItem.prototype.getData = () => {
    return {
        _id : this._id,
        t_design_id : this.t_design_id,
        m_product_id : this.m_product_id,
        title_item : this.title_item,
        request_pic : this.request_pic,
        start_date : this.start_date,
        end_date : this.end_date,
        request_due_date : this.request_due_date,
        note : this.note,
        is_delete : this.is_delete,
        created_by : this.created_by,
        created_date : this.created_date,
        updated_by : this.updated_by,
        updated_date : this.updated_date
    }
}

module.exports = DesignItem