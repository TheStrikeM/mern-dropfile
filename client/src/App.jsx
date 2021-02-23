import Navbar from "./components/navbar"
import './app.sass'
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Register from "./components/register";
import 'antd/dist/antd.css'
import Login from "./components/login";

function App() {
  return (
      <BrowserRouter>
          <div className="wrapper">
              <Navbar />
              <Switch>
                  <Route path="/register" component={Register} />
                  <Route path="/login" component={Login} />
              </Switch>
          </div>
      </BrowserRouter>

  );
}

export default App;
