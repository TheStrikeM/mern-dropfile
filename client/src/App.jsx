import Navbar from "./components/navbar"
import './app.sass'
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Register from "./components/register";
import 'antd/dist/antd.css'
import Login from "./components/login";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {authUser} from "./actions/user";
import Disk from "./components/disk";

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
                        <>
                            <Switch>
                                <Route path="/" exact component={Disk} />
                            </Switch>
                            <Redirect to={"/"} />
                        </>
                    )
                    :
                    (
                        <>
                            <Switch>
                                <Route path="/register" exact component={Register}/>
                                <Route path="/login" exact component={Login}/>
                            </Switch>
                            <Redirect to={"/login"} />
                        </>
                    )
                }

            </div>
        </BrowserRouter>

    );
}

export default App;
