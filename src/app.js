import React from 'react';
import {lazy,Suspense} from 'react';
// import Login from './pages/login';
import * as ROUTES from './constants/routes';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';
import ProtectedRoute from './helpers/protected-route';
import EditProfile from './components/profile/editprofile';

const Login=lazy(()=> import('./pages/login'));
const SignUp=lazy(()=> import('./pages/signup'));
const NotFound=lazy(()=> import('./pages/not-found'));
const Dashboard=lazy(()=> import('./pages/dashboard'));
const Profile=lazy(()=>import('./pages/profiles'))
const Upload=lazy(()=>import ('./pages/upload'));
const Modal=lazy(()=>import('./components/profile/modal'))


const App=()=>{
    const {user}=useAuthListener();
    return (
        <UserContext.Provider value={{user}}>
        <Router>
            <Suspense fallback={<div className="w-screen h-screen">
                <div className="flex justify-center mt-52">
                <div className="loader"></div>
                </div>
            </div>}>
            <Switch>
              <Route path={ROUTES.LOGIN} component={Login}/> 
              <Route path={ROUTES.SIGN_UP} component={SignUp}/>
              <Route path={ROUTES.PROFILE} component={Profile}/>
              <Route path={ROUTES.EDIT} component={EditProfile}/>
              <Route path={ROUTES.MODAL} component={Modal}/>
              <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
                   <Dashboard/>
              </ProtectedRoute>
              <ProtectedRoute user={user} path={ROUTES.UPLOAD} exact>
                   <Upload/>
              </ProtectedRoute>
              <Route component={NotFound}/>
          </Switch>
            </Suspense>
         

        </Router>
        </UserContext.Provider>
    )
}

export default App;