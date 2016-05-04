import React from 'react'
import { Group, List,Badge} from 'amazeui-touch'
import user from '../../stores/user'

class me extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            avatar:<img alt='头像'/>,
            nickname:'',
            userid:0
        }
    }
    componentWillMount = async ()=>{
        let result = await user.getByKey(localStorage.getItem('key'),
        localStorage.getItem('token'))
        if(result.code === 0){
            this.setState({
                avatar:<img width="80" src={result.data.face_path}/>,
                nickname:result.data.names,
                userid:result.data.uid
            })
        }
    }
    render(){
        const badge1 = <Badge rounded amStyle="alert">5</Badge>
        
        return(
            <div>
                <Group noPadded>
                    <List>
                        <List.Item
                            media = {this.state.avatar}
                            title = {"id:"+this.state.userid}
                            after = {this.state.nickname}
                            href="#"
                        />
                        
                    </List>
                </Group>
            </div>
        )
    }
}

export default me