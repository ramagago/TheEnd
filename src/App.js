import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import PhotoList from "./components/PhotoList";
import Post from "./components/Post";
import PhotoDetails from "./components/PhotoDetails";
import Admin from "./components/Admin";
import CategoriesAdmin from "./components/CategoriesAdmin";
import PhotoListAdmin from "./components/PhotoListAdmin";
import PostEdit from "./components/PostEdit";
import AdminLogin from "./components/AdminLogin";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/PhotoList/:filter">
            <PhotoList />
          </Route>
          <Route path="/Post">
            <Post />
          </Route>
          <Route path="/Admin">
            <Admin />
          </Route>
          <Route path="/CategoriesAdmin">
            <CategoriesAdmin />
          </Route>
          <Route path="/PhotoListAdmin/:filter">
            <PhotoListAdmin />
          </Route>
          <Route path="/PostEdit/:id/:uuid/:filter">
            <PostEdit />
          </Route>
          <Route path="/photos/:uuid">
            <PhotoDetails />
          </Route>
          <Route path="/AdminLogin">
            <AdminLogin />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
