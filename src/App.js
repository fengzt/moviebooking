// import logo from './logo.svg';
import "./App.css";
import {lazy, Suspense} from 'react';
import { Router, Switch } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Application from "./pages/Application/Application";
import { createBrowserHistory } from "history";
import Detail from "./pages/Detail/Detail";
import Booking from "./pages/Booking/Booking";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";

export const history = createBrowserHistory();

// keyword: "lazy loading reactjs"
// https://reactjs.org/docs/code-splitting.html

const BookingTemplateLazy = lazy(() =>
  import("./templates/BookingTemplate/BookingTemplate")
);


function App() {
  return (
    <Router history={history}>
      {/* Truyền vào 3 thuộc tính: exact, path và Component vào template */}
      <Switch>
        <HomeTemplate exact path="/home" Component={Home} />
        <HomeTemplate exact path="/contact" Component={Contact} />
        <HomeTemplate exact path="/news" Component={News} />
        <HomeTemplate exact path="/application" Component={Application} />

        <HomeTemplate exact path="/detail/:id" Component={Detail} />

        <UserTemplate exact path="/login" Component={Login} />
        <UserTemplate exact path="/register" Component={Register} />

        <HomeTemplate exact path="/" Component={Home} />

        <Suspense fallback={<div>Loading...</div>}>
          <BookingTemplateLazy path="/booking/:id" exact Component={Booking} />
        </Suspense>
        
      </Switch>
    </Router>
  );
}

export default App;
