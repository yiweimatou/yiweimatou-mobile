import config from '../constants/config'
import fetch from 'isomorphic-fetch'

const _getUser = () => {
    if (!window.localStorage) {
        return null;
    }
    return JSON.parse(localStorage.getItem('user'))
}
const auth = {
    isAuthenticated: () => {
        return !!_getUser()
    },
    getCode: async (mobile) => {
        let result = false
        if (/^(((13)|(15)|(17)|(18))+\d{9})$/.test(mobile)) {
            await fetch(`${config.api}/captcha/add`, {
                method: 'POST',
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `mobile=${mobile}`
            }).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json()
                } else {
                    return Promise.reject(
                        new Error(`response fail:${response.statusText}`)
                    )
                }
            }).then((data) => {
                if (data.code === 0) {
                    return result = true
                }else{
                    return Promise.reject(new Error(data.msg))
                }
            })

        }
        return result
    },
    login:async (mobile,code)=>{
        let result = {
            code:-1,
            msg:'登录失败',
            key:0,
            token:''
        }
        if(!/^(((13)|(15)|(17)|(18))+\d{9})$/.test(mobile)){
            result.msg='请输入正确的手机号码'
            return result
        }
        if(/^\d{6}$/.test(code)){
            await fetch(`${config.api}/user/login`,{
                method:'POST',
                headers:{
                    'Accept-Encoding':'gzip',
                    'Accept':'text/plain',
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body:`mobile=${mobile}&vcode=${code}`
                // body:JSON.stringify({
                //     mobile:mobile,
                //     vcode:code
                // })
            }).then((response)=>{
                    if(response.ok){
                        return response.json()
                    }else{
                        result.msg = response.statusText
                        return Promise.reject(new Error(response.statusText))
                    }
            },(error)=>{
                console.log(error.message)
            }).then(data=>{
                if(data.code === 0){
                    console.log(data)
                    result.code  = 0
                    result.msg = '登录成功',
                    result.key = data.key,
                    result.token = data.token
                    localStorage.setItem('key',data.key)
                    localStorage.setItem('token',data.token)
                }else{
                    result.msg = data.msg
                }
                return result
            },error=>{
                console.log(error.message)
            })
        }else{
            result.msg = '请人输入正确的验证码'
        }
        
        return result
    }
}

export default auth