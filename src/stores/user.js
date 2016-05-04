import fetch from 'isomorphic-fetch'
import config from '../constants/config'

const user = {
    getByKey: async (key, token) => {
        if (key === undefined || key === null 
        || token === undefined || token === null) {
            return null
        }
        let user = {
            code: -1,
            msg: '',
            data: {}
        }
        await fetch(`${config.api}/user/get?key=${key}&token=${token}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    user.msg = response.statusText
                    return Promise.reject(new Error(user.msg))
                }
            }).then(json => {
                if (json.code === 0) {
                    user.code = 0
                    user.data = json.get
                } else {
                    user.msg = json.msg
                }
                return user
            })
        return user
    }
}

export default user