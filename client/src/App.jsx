import Navbar from "./components/navbar"
import './app.sass'
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Register from "./components/register";
import 'antd/dist/antd.css'
import Login from "./components/login";
import {useSelector} from "react-redux";

function App() {
  const isAuth = useSelector(state => state.user.isAuth)

  return (
      <BrowserRouter>
          <div className="wrapper">
              <Navbar />

              {isAuth ?
                  (
                     ''
                  )
                  :
                  (
                      <Switch>
                          <Route path="/register" component={Register} />
                          <Route path="/login" component={Login} />
                      </Switch>
                  )
              }

          </div>
      </BrowserRouter>

  );
}

export default App;
