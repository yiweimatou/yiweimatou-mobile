import config from '../constants/config'
import fetch from 'isomorphic-fetch'

const organ = {
    getById: async(oid) => {
        let result = {
            code:-1,
            msg:'',
            data:{}
        }
        await fetch(`${config.api}/organ/get?oid=${oid}`)
        .then(response=>{
            if(response.ok){
                return response.json()
            }else{
                result.msg = response.statusText
                return Promise.reject(new Error(result.msg))
            }
        }).then(data => {
            if(data.code === 0){
                result.code = 0,
                result.data = data.get
            }else{
                result.msg = data.msg
            }
            return result
        })
        return result
    },
    getInfo: async (oid)=>{
        
    },
    getList: async(limit = 9, offset = 1) => {
        let result = {
            code: -1,
            msg: '',
            data: {}
        }
        await fetch(`${config.api}/organ/list?offset=${offset}&limit=${limit}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                result.msg = response.statusText
                return Promise.reject(new Error(result.msg))
            }
        }).then(data => {
            if (data.code === 0) {
                result.code = 0
                result.data = data.list
            } else {
                result.msg = data.msg
            }
            return result
        })
        return result
    }
}

export default organ