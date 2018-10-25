// import apiconfig from '../configs/api.config.json'

const trimString = str => {
    return str.replace(/^\s+|\s+$/gm,'')
}

const FormValidation = {
    createReqDesign: (design, design_item, callback) => {
        let message = "success"
        design.note = trimString(design.note)
        design.title_header = trimString(design.title_header)

        if (design.t_event_id === "") {
            message = "Pilih event terlebih dahulu"
            return callback(0, message)
        }
        if (design.title_header === "") {
            message = "Isi data Design Title terlebih dahulu" 
            return callback(0, message)
        }
        for (let i = 0; i < design_item.length; i++) {
            design_item[i].title_item = trimString(design_item[i].title_item)
            design_item[i].request_pic = trimString(design_item[i].request_pic)
            design_item[i].note = trimString(design_item[i].note)
            design_item[i].request_due_date = trimString(design_item[i].request_due_date)
            if (design_item[i].m_product_id === "") {
                message = "Pilih jenis product terlebih dahulu (baris "+Number(i+1)+")"
                return callback(0, message)
            }
            if (design_item[i].title_item === "") {
                message = "Isi kolom Title terlebih dahulu (baris "+Number(i+1)+")"
                return callback(0, message)
            }
            if (design_item[i].request_pic === "") {
                message = "Isi kolom Request PIC terlebih dahulu (baris "+Number(i+1)+")"
                return callback(0, message)
            }
            if (design_item[i].request_due_date === "") {
                message = "Isi kolom Due Date terlebih dahulu (baris "+Number(i+1)+")"
                return callback(0, message)
            }
        }

        return callback(1, message, design, design_item)
    },
}

export default FormValidation