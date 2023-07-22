import React, { useState, useEffect } from "react";
import "./Home.css";
import Categories from "./Categories/Categories";
import Contact from "./Contact/Contact";
import Video from "./Video/Video";
import LoaderHome from "../Loader/LoaderHome";

const Home = () => {
  const [isPending, setIsPending] = useState(true);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsPending(false);
      setStart(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="home">
      {isPending && <LoaderHome />}
      <div>{start && <Categories />}</div>
      <div>{start && <Video />}</div>
      <div>{start && <Contact />}</div>
    </div>
  );
};

export default Home;
