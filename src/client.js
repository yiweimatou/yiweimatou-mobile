import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory,useRouterHistory} from 'react-router'
// import createBrowserHistory from 'history/lib/createBrowserHistory'
// import {createHistory} from 'history'
import Routes from './routes'
// import injectTapEventPlugin from 'react-tap-event-plugin'

// injectTapEventPlugin()

render(
    <Router history={browserHistory}
            onUpdate={() => window.scrollTo(0, 0)}>
        {Routes}
    </Router>
    ,document.getElementById('root')
)