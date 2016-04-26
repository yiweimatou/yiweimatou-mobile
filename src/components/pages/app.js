import React from 'react'
import {
  Container,
  Group,
  TabBar,
  Icon,
  Badge,
  amStyles,
} from 'amazeui-touch'
import {Link} from 'react-router'

const App = React.createClass({
    getInitialState() {
        return {
        selected: 'home'
        }
    },
    
    handledClick(key,e){
        this.setState({
            selected: key
        })
    },
    propsType :{
      children:React.PropTypes.node  
    },
    render(){
        let {
            location,
            params,
            children,
            ...props
        } = this.props;
        let transition = children.props.transition || 'sfr'
        return (
            <Container direction="column">
                 <Container
                    transition={transition}
                 >
                 {this.props.children}
                </Container>
                <Group noPadded>
                    <TabBar
                        onAction = {this.handledClick}
                    >
                        <TabBar.Item 
                            component={Link}
                            eventKey = 'home'
                            active = {this.state.selected === 'home'}
                            icon = 'home'
                            title = '首页'
                            to='/'
                        />
                        <TabBar.Item
                            active={this.state.selected === 'group'}
                            eventKey="group"
                            icon="pages"
                            title="机构"
                        />
                        <TabBar.Item
                            component={Link}
                            active={this.state.selected === 'class'}
                            eventKey="class"
                            icon="list"
                            title="课程"
                            to='/class'
                        />
                        <TabBar.Item
                            component={Link}
                            active={this.state.selected === 'person'}
                            eventKey="person"
                            icon="person"
                            title="我"
                            to='/me'
                        />
                    </TabBar>
                </Group>
             </Container>
        )
    }
})

export default App