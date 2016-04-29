import React from 'react'
import {Field,Group,Button} from 'amazeui-touch'
import Auth from '../../stores/auth'

class getCode extends React.Component {
    displayName = 'getcode'
    static contextTypes = {
            router:React.PropTypes.object
    }
    constructor(props,context){
        super(props,context)
        this.state = {
            disabled:true
        }
    }
    handleChange(e){
        let mobile = e.target.value
        if(/^(((13)|(15)|(17)|(18))+\d{9})$/.test(mobile)){
                this.setState({
                    disabled:false
                })
        }else if(!this.state.disabled){
            this.setState({
                disabled:true
            })
        }
         
    }
    handleClick= async ()=> {
        let mobile = this.refs.mobile.getValue()
        if(await Auth.getCode(mobile)){
            this.context.router.push({
                pathname:'/login',
                query:{
                    mobile:mobile
                }
            })
        }
    }
    render(){
        return(
            <Group header='获取验证码'>
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