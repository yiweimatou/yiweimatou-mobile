import React from 'react'
import {
    Field,
    Group,
    Button,
    Grid,
    Col,
    Notification
} from 'amazeui-touch'
import Auth from '../../stores/auth'

class login extends React.Component{
    displayName = 'login'
    constructor(props,context){
        super(props,context)
        this.state = {
                disabled:true,
                count:60,
                visible:false,
                notice:''
        }
    }
    componentWillMount(){
        if(!this.props.location.query.mobile){
            this.context.router.push('/getcode')
        }
    }
    componentDidMount(){
    	this.interval = setInterval(this.counter,1000)
        this.setState({
            notice:'验证码已发送至手机请在1分钟内输入',
            visible:true
        })
    }
    counter = () =>{
        if(this.state.count === 0){
            clearInterval(this.interval)
        }else{
            this.setState({
                count:this.state.count-1
            })
        }
    }
    handleChange (e){
        if(/^\d{6}$/.test(e.target.value)){
            this.setState({
                disabled:false
            })
        }else if(!this.state.disabled){
            this.setState({
                disabled:true
            })
        }
    }
    handleSubmit = async ()=> {
        let result = await Auth.login(this.props.location.query.mobile,
        this.refs.code.getValue())
        if(result.code === 0){
            if(this.state.count != 0){
                this.setState({
                    count:0
                })
                clearInterval(this.interval)
            }
            this.context.router.push('/')
        }else{
            this.setState({
                visible:true,
                notice:result.msg
            })
        }
    }
    handleCode =async ()=>{
        if(await Auth.getCode(this.props.location.query.mobile)){
            this.setState({
                count:60
            })
            this.interval = setInterval(this.counter,1000)
        }
    }
    handleClose = ()=>{
        this.setState({
            visible:false
        })
    }
    render(){
        return(
            <div>
                <Notification
                    visible = {this.state.visible}
                    animated
                    onDismiss = {()=>{this.handleClose()}}
                >
                {this.state.notice}
                </Notification>
                <Group header='登录'>
                    <h3 hidden={this.state.count===0}>
                        
                    </h3>
                    <Grid collapse={true} align={'between'}>
                        <Col cols={3}>
                            <Field 
                                ref = 'code'
                                placeholder='验证码'
                                onChange = {this.handleChange.bind(this)}
                            /> 
                        </Col>
                        <Col cols={3} shrink >
                            <Button amStyle='secondary'
                                disabled = {this.state.count>0 }
                                onClick = {this.handleCode}
                            >
                                {this.state.count>0?this.state.count:'获取验证码'}
                            </Button>
                        </Col>
                    </Grid>
                    
                    <Button 
                        amStyle="secondary" 
                        block
                        disabled = {this.state.disabled}
                        onClick = {this.handleSubmit}
                        >
                        登录
                    </Button>
                </Group>
            </div>
        )
    }
}

login.contextTypes = {
        router:React.PropTypes.object
}
export default login