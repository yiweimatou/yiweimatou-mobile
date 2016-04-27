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

class App extends React.Component{
    propsType ={
      children:React.PropTypes.node  
    }
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
                 {children}
                </Container>
                <TabBar
                >
                    <TabBar.Item 
                        component={Link}
                        eventKey = 'home'
                        active = {location.pathname === '/'}
                        icon = 'home'
                        title = '首页'    
                        to='/'
                    />
                    <TabBar.Item
                        active={location.pathname === '/group'}
                        eventKey="group"
                        icon="pages"
                        title="机构"
                    />
                    <TabBar.Item
                        component={Link}
                        active={location.pathname === '/class'}
                        eventKey="class"
                        icon="list"
                        title="课程"
                        to='/class'
                    />
                    <TabBar.Item
                        component={Link}
                        active={location.pathname === '/me'}
                        eventKey="person"
                        icon="person"
                        title="我"
                        to='/me'
                    />
                </TabBar>
             </Container>
        )
    }
}

export default App