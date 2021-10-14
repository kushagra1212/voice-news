import { useRef, useEffect } from "react";
import Styles from "./Newscard.module.css";
const Newsimg = "../news.png";
const Newscard = ({ article, count, i }) => {
  const { description, url, publishedAt, source, title, image } = article;
  const myref = useRef(null);
  useEffect(() => {
    if (myref.current && count === i) {
      myref.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  return (
    <>
      <div
        className={Styles.mydiv}
        ref={myref}
        style={
          count === i
            ? { borderBottomWidth: "5px", borderBottomColor: "blue" }
            : {}
        }
      >
        <div className={Styles.imgdiv}>
          <img src={image} width="100%" height="100%" alt={Newsimg} />
        </div>
        <div className={Styles.carddiv}>
          <strong>{title}</strong>
        </div>
        <div className={Styles.sourcedate}>
          {" "}
          {new Date(publishedAt).toDateString()}
          <></> source :{source.name}
        </div>
        <div className={Styles.description}>{description}</div>
        <button className={Styles.read}>
          <a href={url}>Read more</a>
        </button>
      </div>
    </>
  );
};
export default Newscard;
