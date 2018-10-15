function Employee(data) {
    this._id = data._id;
    this.employee_number = data.employee_number;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.m_company_id = data.m_company_id;
    this.email = data.email;
    this.is_delete = data.is_delete;
    this.created_by = data.created_by;
    this.created_date = data.created_date;
    this.updated_by = data.updated_by;
    this.updated_date = data.updated_date;
}

Employee.prototype.getData = () => {
    return {
        _id : this._id,
        employee_number : this.employee_number,
        first_name : this.first_name,
        last_name : this.last_name,
        m_company_id : this.m_company_id,
        email : this.email,
        is_delete : this.is_delete,
        created_by : this.created_by,
        created_date : this.created_date,
        updated_by : this.updated_by,
        updated_date : this.updated_date
    }
}

module.exports = Employee