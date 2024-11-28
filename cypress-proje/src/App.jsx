import { BrowserRouter, Router, Route } from "react-router-dom";
import Login from "../../components/Login.jsx";
import Success from "../../components/Success.jsx";
import ErrorPage from "../../components/ErrorPage.jsx";


function App() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/error" element={<ErrorPage />} />
      </Router>
    </BrowserRouter>
  );
}

export default App;