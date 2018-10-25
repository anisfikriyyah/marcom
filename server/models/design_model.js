const ObjectID = require('mongodb').ObjectID

function Design(data) {
    this._id = data._id;
    this.code = data.code;
    this.t_event_id = data.t_event_id;
    this.title_header = data.title_header;
    this.request_by = data.request_by;
    this.request_date = data.request_date;
    this.approved_by = data.approved_by;
    this.approved_date = data.approved_date;
    this.assign_to = data.assign_to;
    this.closed_date = data.closed_date;
    this.note = data.note;
    this.status = data.status;
    this.reject_reason = data.reject_reason;
    this.is_delete = data.is_delete;
    this.created_by = data.created_by === "undefined" ? data.created_by : ObjectID(data.created_by);
    this.created_date = data.created_date;
    this.updated_by = data.updated_by === "undefined" ? data.updated_by : ObjectID(data.updated_by);
    this.updated_date = data.updated_date;
}

Design.prototype.getData = () => {
    return {
        _id : this.data._id,
        code : this.data.code,
        t_event_id : this.data.t_event_id,
        title_header : this.data.title_header,
        request_by : this.data.request_by,
        request_date : this.data.request_date,
        approved_by : this.data.approved_by,
        approved_date : this.data.approved_date,
        assign_to : this.data.assign_to,
        closed_date : this.data.closed_date,
        note : this.data.note,
        status : this.data.status,
        reject_reason : this.data.reject_reason,
        is_delete : this.data.is_delete,
        created_by : this.data.created_by,
        created_date : this.data.created_date,
        updated_by : this.data.updated_by,
        updated_date : this.data.updated_date
    }
}

module.exports = Design