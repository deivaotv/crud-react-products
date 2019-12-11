import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from '../pages/Login/index'
import Products from '../pages/Products/products'
import Product from '../pages/Products/product'
import Store from '../pages/Products/store'

import { isAuthenticated } from '../services/auth'

const PrivateRoute = ({ component:  Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
            <Component {...props} />
            ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location }}} />
            )
        }
    />
)

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/products" component={Products} />
            <PrivateRoute path="/product/:id" component={Product} />
            <PrivateRoute path="/products-store" component={Store} />
            <Route path="*" component={() => <h1>Page not Found</h1>} />
        </Switch>
    </BrowserRouter>
)

export default Routes;