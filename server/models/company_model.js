function Company(data) {
    this._id = data._id;
    this.code = data.code;
    this.name = data.name;
    this.address = data.address;
    this.phone = data.phone;
    this.email = data.email;
    this.is_delete = data.is_delete;
    this.created_by = data.created_by;
    this.created_date = data.created_date;
    this.updated_by = data.updated_by;
    this.updated_date = data.updated_date;
}

Company.prototype.getData = () => {
    return {
        _id : this._id,
        code : this.code,
        name : this.name,
        address : this.address,
        phone : this.phone,
        email : this.email,
        is_delete : this.is_delete,
        created_by : this.created_by,
        created_date : this.created_date,
        updated_by : this.updated_by,
        updated_date : this.updated_date
    }
}

module.exports = Company