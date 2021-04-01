import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Admin from "./components/Admin/Admin";
import Home from "./components/Home/Home"
import NavBar from "./components/Navbar/Navbar";
import Orders from "./components/Orders/Orders";
import Deals from "./components/Deals/Deals";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import NavAdminPage from "./components/NavAdminPage/NavAdminPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ErrorPage from "./components/ErrorPage/ErrorPage";

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isUserLoggedIn,setIsUserLoggedIn]=useState(false);
  return (
    <userContext.Provider value={{loggedInUser, setLoggedInUser,isUserLoggedIn,setIsUserLoggedIn}}>
      <Router>
        <Switch>
          <Route exact path="/">
          <NavBar></NavBar>
            <Home></Home>
          </Route>
          <Route path="/home">
          <NavBar></NavBar>
            <Home></Home>
          </Route>
          
          <PrivateRoute path="/orders/:email">
          <NavBar></NavBar>
            <Orders></Orders>
          </PrivateRoute>
          <PrivateRoute path="/admin/:task">
          <NavAdminPage></NavAdminPage>
            <Admin></Admin>
          </PrivateRoute>
          <Route path="/deals">
          <NavBar></NavBar>
            <Deals></Deals>
          </Route>
          <PrivateRoute path="/checkout/:id">
          <NavBar></NavBar>
            <Checkout></Checkout>
          </PrivateRoute>
          <Route path="/login">
          <NavBar></NavBar>
            <Login></Login>
          </Route>
          <Route path="*">
            <ErrorPage></ErrorPage>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
