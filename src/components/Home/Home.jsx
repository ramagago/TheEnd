import React from "react";
import "./Home.css";
import Categories from "./Categories/Categories";
import Contact from "./Contact/Contact";
import Video from "./Video/Video";

const Home = () => {
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
// const [start, setStart] = useState(false);

// useEffect(() => {
//   const timeoutId = setTimeout(() => {
//     setIsPending(false);
//     setStart(true);
//   }, 500);

//   return () => clearTimeout(timeoutId);
// }, []);
