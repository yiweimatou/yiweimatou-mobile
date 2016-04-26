import React from 'react'
import {
    Route,
    Redirect,
    IndexRoute,
} from 'react-router'
import App from '../components/pages/app'
import Home from '../components/pages/home'
import Me from '../components//pages/me'
import GetCode from '../components/pages/getCode'
import Class from '../components/pages/class'
import Login from '../components/pages/login'
import NotFound from '../components/pages/notfound'
import Auth from '../stores/auth'

const requireAuth = (nextState,replace)=>{
    if(!Auth.isAuthenticated()){
        replace({
            pathname:'/getcode',
            state:{
                nextPathname:nextState.location.pathname
            }
        })
    }
}
const Routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path='me' component={Me} onEnter={requireAuth} />
        <Route path='getcode' component={GetCode} />
        <Route path='class' component={Class} />
        <Route path='login' component={Login} />
        <Route path="*" component={NotFound} />                 
    </Route>
    
) 

export default Routes