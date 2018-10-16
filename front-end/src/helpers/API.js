import axios from 'axios'
import apiconfig from '../configs/api.config.json'

const API = {
    login: async (username, password) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.LOGIN,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                username: username,
                password: password
            }
        }
        try {
            let result = await axios(option)
            return result.data
        } catch (error) {
            return error.response.data

        }
    },
    company: async(code, name, created_date, created_by)=>{
        let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY,
            method: "GET",
            headers: {
                "authorization": token
            },
            data:{
                code: code,
                name: name,
                created_date: created_date,
                created_by: created_by
            }
        }
        try {
            let result = await axios(option)
            return result.data
        } catch(error){
            return error.response.data
        }
    },
    getListItem: async (path) => {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL + path,
            method: "get",
            headers: {
                "authorization": token
            }
        }
        try {
            let response = await axios(option)
            return response.data.message
        }
        catch(error) {
            return error
        }
    }
}

export default API
