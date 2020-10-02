import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from './component/Dashboard/dashboard.component';
import Exam from './component/exam.component';
import Hero from "./component/Hero section/hero";
import Login from "./component/login";
import Register from './component/register';
import Result from './component/result.component';
import { Provider } from 'react-redux';
import store from './store'
function App() {
  return (
    <>
      <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <Switch>
            <Route path="/" exact component={Hero} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path='/dashboard' exact component={Dashboard} />
            <Route exact path='/main-exam' component={Exam} />
            <Route exact path='/result' component={Result} />


          </Switch>

        </div>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
