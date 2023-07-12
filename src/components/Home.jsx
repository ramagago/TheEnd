import React, { useState, useEffect } from "react";
import Categories from "./Categories";
import Contact from "./Contact";
import Video from "./Video";

const Home = () => {
  const [isPending, setIsPending] = useState(true);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsPending(false);
      setStart(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {start && <Categories />}
      {start && <Video />}
      {start && <Contact />}
    </div>
  );
};

export default Home;
