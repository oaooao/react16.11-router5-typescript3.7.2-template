import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Login from '@/pages/login/login'
import Home from '@/pages/home/home'
import NotFound from '@/pages/notFound/notFound'

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/404" component={NotFound} />
                <Route path="/login" component={Login} />
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    )
}

export default App
