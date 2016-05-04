import React from 'react'
import SliderCaption from '../SliderCaption'
import organization from '../../stores/organization'
import { Group } from 'amazeui-touch'

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            organs:{}
        }       
    }
    componentWillMount=async () => {
        let organs = localStorage.getItem('slider')
        if(organs === null){
            let list = await organization.getList(5)
            if(list.code === 0){
                organs = list.data
                this.setState({
                    organs:organs
                })
                localStorage.setItem('slider',JSON.stringify(organs))
            }
        }else{
            this.setState({
                organs:JSON.parse(organs)
            })
        }
    }
    render() {
        return ( < div >
                    <Group header='最新机构' noPadded>
                        <SliderCaption
                            Items = {this.state.organs}
                        />
                    </Group>
                < /div>
        )
    }
}

export default Home
