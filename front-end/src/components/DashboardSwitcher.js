import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ListMenu from './content/menu/ListMenu'
import { Redirect } from 'react-router';
import apiconfig from '../configs/api.config.json'

const DashboardSwitcher = () => {
  return (
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <Switch>
              <PrivateRoute path="/" component={ListMenu} />
              <PrivateRoute path="/dashboard" component={ListMenu} />
              <PrivateRoute path="/master/menu" component={ListMenu} />
              {/* <PrivateRoute path="/agama" component={ListAgama} />
              <PrivateRoute path="/pengarang" component={ListPengarang} />
              <PrivateRoute path="/*" component={ListBuku} /> */}
            </Switch>
        </main>
    )
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem(apiconfig.LS.TOKEN)!=null? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
export default DashboardSwitcher
