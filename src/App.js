import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import PhotoGallery from "./components/PhotoGallery/PhotoGallery/PhotoGallery";
import Post from "./components/Admin/Post/Post";
import PhotoDetails from "./components/PhotoGallery/PhotoDetails/PhotoDetails";
import Admin from "./components/Admin/Admin";
import CategoriesAdmin from "./components/Admin/CategoriesAdmin/CategoriesAdmin";
import PhotoListAdmin from "./components/Admin/PhotoListAdmin/PhotoListAdmin";
import PostEdit from "./components/Admin/Post/PostEdit";
import AdminLogin from "./components/Admin/AdminLogin/AdminLogin";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/PhotoList/:filter">
            <PhotoGallery />
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
          <Route path="/PhotoDetails/:uuid/:currentFilter">
            <PhotoDetails />
          </Route>
          <Route path="/AdminLogin">
            <AdminLogin />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;