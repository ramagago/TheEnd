import React, { useEffect } from "react";
import "./Home.css";
import Categories from "./Categories/Categories";
import Contact from "./Contact/Contact";
import Video from "./Video/Video";

const Home = () => {
  
  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);
  
  return (
    <div className="home">
      <div>
        <Categories />
      </div>
      <div>
        <Video />
      </div>
      <div>
        <Contact />
      </div>
    </div>
  );
};
export default Home;
