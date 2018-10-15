function User(data) {
    this._id = data._id;
    this.username = data.username;
    this.password = data.password;
    this.m_role_id = data.m_role_id;
    this.m_employee_id = data.m_employee_id;
    this.is_delete = data.is_delete;
    this.created_by = data.created_by;
    this.created_date = data.created_date;
    this.updated_by = data.updated_by;
    this.updated_date = data.updated_date;
}

User.prototype.getData = () => {
    return {
        _id : this._id,
        username : this.username,
        password : this.password,
        m_role_id : this.m_role_id,
        m_employee_id : this.m_employee_id,
        is_delete : this.is_delete,
        created_by : this.created_by,
        created_date : this.created_date,
        updated_by : this.updated_by,
        updated_date : this.updated_date
    }
}

module.exports = User