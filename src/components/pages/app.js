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
                        component={Link}
                        active={location.pathname === '/class'}
                        eventKey="class"
                        icon="list"
                        title="课程"
                        to='/class'
                    />
                    <TabBar.Item
                        active={location.pathname === '/search'}
                        eventKey="search"
                        icon="search"
                        title="发现"
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