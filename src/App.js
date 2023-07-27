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
          <Route path="/photo-list/:filter">
            <PhotoGallery />
          </Route>
          <Route path="/post">
            <Post />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/categories-admin">
            <CategoriesAdmin />
          </Route>
          <Route path="/photo-list-admin/:filter">
            <PhotoListAdmin />
          </Route>
          <Route path="/post-edit/:id/:uuid/:filter">
            <PostEdit />
          </Route>
          <Route path="/photo-details/:uuid/:currentFilter">
            <PhotoDetails />
          </Route>
          <Route path="/admin-login">
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