import Styles from "./Home.module.css";
const Home = () => {
  return (
    <div className={Styles.main}>
      <div className={Styles.cont}>
        <div
          className={Styles.container}
          style={{ backgroundColor: "#330867" }}
        >
          <div className={Styles.header}>TOP NEWS</div>
          <div className={Styles.label}>
            Show me top news<br></br>
            Show me top news from india
          </div>
        </div>
        <div
          className={Styles.container}
          style={{ backgroundColor: "#00ecbc" }}
        >
          <div className={Styles.header}>NEWS BY CATEGORY</div>
          <div className={Styles.label}>
            Show me sports news<br></br>
            Show me business news
            <br></br>
            other categories<br></br>
            business" "entertainment" "world" "health" "science" "sports"
            "technology"
          </div>
        </div>

        <div className={Styles.container} style={{ backgroundColor: "#000000" }}>
          <div className={Styles.header}>SEARCH ANYTHING</div>
          <div className={Styles.label}>
            Give me bitcoin news<br></br>
            Give me Covid-19 News
          </div>
        </div>
        <div className={Styles.container} style={{ backgroundColor: "#005bea" }}>
          <div className={Styles.header}>RETURN COMMANDS</div>
          <div className={Styles.label}>
            return home <br></br>
            go back
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
