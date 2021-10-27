import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'

// Components
import NavBar from './components/layout/Navbar'
// import themeObject from './util/theme'
import AuthRoute from './util/AuthRoute'
import UserRoute from './util/UserRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import User from './pages/user'
import PostDialog from './components/post/PostDialog';


const theme = createMuiTheme(themeFile)

const token = localStorage.getItem("FBIdtoken") ? localStorage.getItem("FBIdtoken").split(" ")[1] : undefined;

if(token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    store.dispatch(logoutUser())
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    const FBIdtoken = `Bearer ${token}`
    axios.defaults.headers.common['Authorization'] = FBIdtoken
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>

      <Provider store={store}>
        <Router>
          <NavBar/>
          <div className="container">
            <Switch>
              <AuthRoute exact path="/login" component={Login}/>
              <AuthRoute exact path="/signup" component={Signup}/>
              <UserRoute exact path="/" component={Home}/>
              <UserRoute exact path="/users/:pseudo" component={User}/>
              <UserRoute exact path="/users/:pseudo/post/:postId" component={User}/>
              <UserRoute path="*" component={User}/>
            </Switch>
          </div>
        </Router>
      </Provider>

    </MuiThemeProvider>
  );
}

export default App;
