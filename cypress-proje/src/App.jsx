import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../../components/Login.jsx";
import Success from "../../components/Success.jsx";
import ErrorPage from "../../components/ErrorPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/success" component={Success} />
        <Route exact path="/error" component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
