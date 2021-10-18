// import logo from './logo.svg';
import "./App.css";
// import { lazy, Suspense } from "react";
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
import { Booking, BookingPage } from "./pages/Booking/Booking";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import Loading from "./components/Loading/Loading";
import BookingTemplate from "./templates/BookingTemplate/BookingTemplate";
import Profile from "./pages/Profile/Profile";
import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Films from "./pages/Admin/Films/Films";
import ShowTime from "./pages/Admin/Showtime/Showtime";
import AddFilm from "./pages/Admin/Films/AddFilm/AddFilm";
import EditFilm from "./pages/Admin/Films/EditFilm/EditFilm";
import AddUser from "./pages/Admin/Dashboard/AddUser/AddUser"
import EditUser from "./pages/Admin/Dashboard/EditUser/EditUser"

export const history = createBrowserHistory();

// keyword: "lazy loading reactjs"
// https://reactjs.org/docs/code-splitting.html

// const BookingTemplateLazy = lazy(() =>
//   import("./templates/BookingTemplate/BookingTemplate")
// );

function App() {
  return (
    <Router history={history}>
      {/* Truyền vào 3 thuộc tính: exact, path và Component vào template */}
      <Loading />
      <Switch>
        <HomeTemplate exact path="/home" Component={Home} />
        <HomeTemplate exact path="/contact" Component={Contact} />
        <HomeTemplate exact path="/news" Component={News} />
        <HomeTemplate exact path="/application" Component={Application} />
        <HomeTemplate exact path="/profile" Component={Profile} />

        <AdminTemplate exact path="/admin" Component={Dashboard} />
        <AdminTemplate exact path="/admin/users" Component={Dashboard} />
        <AdminTemplate exact path="/admin/users/adduser" Component={AddUser} />
        <AdminTemplate exact path="/admin/users/edituser/:id" Component={EditUser} />

        <AdminTemplate exact path="/admin/films" Component={Films} />
        <AdminTemplate exact path="/admin/films/addfilm" Component={AddFilm} />
        <AdminTemplate
          exact
          path="/admin/films/editfilm/:id"
          Component={EditFilm}
        />

        <AdminTemplate exact path="/admin/showtimes/:id" Component={ShowTime} />

        <HomeTemplate exact path="/detail/:id" Component={Detail} />

        <UserTemplate exact path="/login" Component={Login} />
        <UserTemplate exact path="/register" Component={Register} />

        <HomeTemplate exact path="/" Component={Home} />

        <BookingTemplate path="/booking/:id" Component={BookingPage} />
        {/* <Suspense fallback={<div>Loading...</div>}>
          <BookingTemplateLazy
            path="/booking/:id"
            exact
            Component={BookingPage}
          />
        </Suspense> */}
      </Switch>
    </Router>
  );
}

export default App;
