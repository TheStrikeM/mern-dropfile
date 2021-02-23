import Navbar from "./components/navbar"
import './app.sass'
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Register from "./components/register";
import 'antd/dist/antd.css'
import Login from "./components/login";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {authUser} from "./actions/user";

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    
    React.useEffect(() => {
        authUser(dispatch)
    }, [])

    return (
        <BrowserRouter>
            <div className="wrapper">
                <Navbar/>

                {isAuth ?
                    (
                        ''
                    )
                    :
                    (
                        <Switch>
                            <Route path="/register" component={Register}/>
                            <Route path="/login" component={Login}/>
                        </Switch>
                    )
                }

            </div>
        </BrowserRouter>

    );
}

export default App;
