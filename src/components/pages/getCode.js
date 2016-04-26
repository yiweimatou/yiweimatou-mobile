import React from 'react'
import {Field,Group,Button} from 'amazeui-touch'
import { browserHistory } from 'react-router'

class getCode extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            disabled:true
        }
    }
    handleChange(e){
        let mobile = e.target.value
        if(mobile.length === 11 
            && /^(((13)|(15)|(17)|(18))+\d{9})$/.test(mobile)){
                this.setState({
                    disabled:false
                })
        }else if(!this.state.disabled){
            this.setState({
                disabled:true
            })
        }
         
    }
    handleClick(){
        this.context.router.push('/login?mobile=13675853598')
    }
    render(){
        return(
            <Group header='登录'>
                <Field 
                    ref = 'mobile'
                    placeholder='手机号码'
                    onChange = {this.handleChange.bind(this)}
                 />
                <Button 
                    amStyle="secondary" 
                    block
                    disabled = {this.state.disabled}
                    onClick = {this.handleClick.bind(this)}
                    >
                    获取验证码
                </Button>
            </Group>
        )
    }
}

export default getCode