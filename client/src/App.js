import React from "react";
import "./style/master.scss"; // applies global scss styles
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/pages/Landing";
import HomePage from "./components/pages/HomePage";
import AllTasks from "./components/pages/AllTasks";
import AddTask from "./components/pages/AddTask";
import EditTask from "./components/pages/EditTask";
import NotFound from "./components/pages/NotFound";
import Signup from "./components/pages/Signup";

function App() {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/all-tasks" component={AllTasks} />
            <Route exact path="/add-task" component={AddTask} />
            <Route exact path="/edit-task" component={EditTask} />
            <Route component={NotFound} />
         </Switch>
      </Router>
   );
}

export default App;
