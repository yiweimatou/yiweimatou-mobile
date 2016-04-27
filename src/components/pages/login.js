import React from 'react'
import {Field,Group,Button} from 'amazeui-touch'

class login extends React.Component{
    displayName = 'login'
    static contextTypes = {
        router:React.PropTypes.object
    }
    constructor(props,context){
        super(props,context)
        this.state = {
                disabled:true,
                count:60
        }
    }
    componentWillMount(){
        if(!this.props.location.query.mobile){
            this.context.router.push('/getcode')
        }
    }
    componentDidMount(){
    	this.interval = setInterval(this.counter,1000)
    }
    counter = () =>{
        if(this.state.count === 0){
            clearInterval(this.interval)
        }else{
            this.setState({
                count:--this.state.count
            })
        }
    }
    handleChange (e){
        
    }
    handleClick(){
        
    }
    render(){
        return(
            <Group header='登录'>
                <h3>验证码已发送至手机请在1分钟内输入</h3>
                <Field 
                    ref = 'code'
                    placeholder='验证码'
                    onChange = {this.handleChange.bind(this)}
                 />
                <Button 
                    amStyle="secondary" 
                    block
                    disabled = {this.state.disabled}
                    onClick = {this.handleClick.bind(this)}
                    >
                    登录
                </Button>
            </Group>
        )
    }
}

export default login