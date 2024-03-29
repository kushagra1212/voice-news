import Styles from "./App.module.css";

import { useEffect, useState } from "react";
import Newscards from "./components/Newscards";
import Axios from "./axios.js";
import Home from "./components/Home";
const SpeechRecognistion =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognistion();

recognition.lang = "en-IN";
let reco = true;
recognition.onstart = () => {
  console.log("listening your voice");
  reco = false;
};

const APIKEY = process.env.REACT_APP_NEWSS_API_KEY;

const App = () => {
  const [newstopic, setnewstopic] = useState("");
  const [articles, setarticles] = useState([]);
  const [country, setcountry] = useState("");
  const [topheadlines, settopheadlines] = useState("");
  const [category, setcategory] = useState("");
  const [noneof, setnoneof] = useState({ notunderstand: false, home: true });

  const [systemaudio] = useState([
    "can you speak that again ?",
    "Sorry I did not understand",
    "can you repeat that ",
  ]);
  const [transcript, settranscript] = useState("");
  const [lang, setlang] = useState("");
  const [listening, setlistening] = useState(false);

  const [count, setcount] = useState(-1);
  const [none, setnone] = useState(false);

  useEffect(() => {
    let msg = new SpeechSynthesisUtterance("Here it is ");
    if (newstopic.length > 1) {
      Axios.get(`/search?q=${newstopic}&token=${APIKEY}`)
        .then((res) => {
          setarticles(res.data.articles);
          window.speechSynthesis.speak(msg);
          msg = new SpeechSynthesisUtterance(
            "would you like me to read that ?"
          );
          window.speechSynthesis.speak(msg);
          msg.onstart = () => {
            setTimeout(() => {
              recognition.start();
            }, 1000);
          };

          setlistening(true);

          setnewstopic("");
        })
        .catch((err) => console.log(err));
    }
  }, [newstopic]);

  useEffect(() => {
    if (topheadlines.length > 1) {
      let msg = new SpeechSynthesisUtterance("Here it is ");
      Axios.get(
        `/${topheadlines}?${
          category.length > 1 ? `&topic=${category}` : "&topic=breaking-news"
        }&lang=${lang}${
          country.length > 1 ? `&country=${country}` : "&country=us"
        }&token=${APIKEY}`
      )
        .then((res) => {
          setarticles(res.data.articles);
          window.speechSynthesis.speak(msg);

          msg = new SpeechSynthesisUtterance(
            "would you like me to read that ?"
          );
          window.speechSynthesis.speak(msg);
          msg.onstart = () => {
            setTimeout(() => {
              recognition.start();
            }, 1000);
          };

          setlistening(true);

          settopheadlines("");
        })
        .catch((err) => console.log(err));
    }
  }, [topheadlines, category, lang, country]);

  useEffect(() => {
    if (noneof.notunderstand) {
      console.log("did not understand");
      let msg = new SpeechSynthesisUtterance(
        systemaudio[Math.floor(Math.random() * 3)]
      );
      window.speechSynthesis.speak(msg);
    }
  }, [noneof,systemaudio]);
  useEffect(() => {
    if (none) {
      for (let i = 0; i < articles.length; i++) {
        if (none) {
          let ms = new SpeechSynthesisUtterance(articles[i].title);
          ms.onstart = () => {
            console.log("started");
            setcount(i);
          };
          window.speechSynthesis.speak(ms);
        }
      }
    }
  }, [none,articles]);
  const shownews = (e) => {
    const current = e.resultIndex;
    settranscript(e.results[current][0].transcript);

    let temp = e.results[current][0].transcript;
    let ar = e.results[current][0].transcript.split(" ");
    console.log(ar);
    if (temp.indexOf("top") !== -1) {
      console.log("from top");
      const country = ar[ar.length - 1]; //show me top news from india
      if (country === "India") setcountry("in");
      if (country === "Tamil") setcountry("ta");

      setcategory("");

      setnoneof({ notunderstand: false, home: false });
      setnewstopic("");
      settopheadlines("top-headlines");
    } else if (temp.indexOf("India") !== -1) {
      console.log("from india");

      //show me  news from india

      const c = [
        "business",
        "entertainment",
        "world",
        "health",
        "science",
        "sports",
        "technology",
      ];

      for (let ci in c) {
        if (temp.search(ci)) {
          setcategory(ci);
          break;
        }
      }

      //show me sports news from india
      if (temp.search("Hindi")) setlang("hi");
      if (temp.search("Tamil")) setlang("ta"); //show me sports news from india in Hindi
      setcountry("in");

      setnoneof({ notunderstand: false, home: false });

      setnewstopic("");
      settopheadlines("top-headlines");
    } else if (
      temp.indexOf("news") !== -1 &&
      temp.indexOf("India") === -1 &&
      temp.indexOf("Hindi") === -1
    ) {
      let cate = "";

      console.log("from news");
      if (
        temp.indexOf("business") !== -1 ||
        temp.indexOf("entertainment") !== -1 ||
        temp.indexOf("world") !== -1 ||
        temp.indexOf("health") !== -1 ||
        temp.indexOf("science") !== -1 ||
        temp.indexOf("sports") !== -1 ||
        temp.indexOf("technology") !== -1
      ) {
        cate = ar[ar.length - 2];
        console.log(cate);

        setcategory(cate); //show me sports news

        setcountry("");
        setnoneof({ notunderstand: false, home: false });

        setnewstopic("");
        settopheadlines("top-headlines");
      } else {
        cate = ar[ar.length - 2];
        console.log(cate);

        // give me bitcoin news
        setcategory("");

        setcountry("");
        setnoneof({ notunderstand: false, home: false });
        settopheadlines("");
        setnewstopic(cate);
      }
    } else if (
      temp.indexOf("return home") !== -1 ||
      transcript.indexOf("go back") !== -1
    ) {
      setcategory("");

      settopheadlines("");
      setnewstopic("");
      setnoneof({ notunderstand: false, home: true });
    } else {


      setnoneof({ notunderstand: true, home: false });
      setnewstopic("");
      setcategory("");

      settopheadlines("");
    }
  };

  useEffect(() => {
    recognition.onresult = (e) => {
      const current = e.resultIndex;

      console.log(e.results[current][0].transcript);
      console.log(transcript);

      if (e.results[current][0].transcript.indexOf("yes") !== -1) {
        console.log("can");
        setnoneof({ notunderstand: false, home: false });
        setnewstopic("");
        setcategory("");

        settopheadlines("");
        settranscript(e.results[current][0].transcript);
        setnone(true);
      } else if (e.results[current][0].transcript !== transcript) {
        shownews(e);
      }
    };
  });
  useState(() => {
    recognition.onend = () => {
      setlistening(false);
      reco = true;
    };
  });

  const miconbutton = () => {
    var msg = new SpeechSynthesisUtterance("listening");
    window.speechSynthesis.speak(msg);

    setlistening(true);
    if (reco) {
      recognition.start();
    }
    setcount(-1);
  };
  const stopbuttonclicked = async () => {
    setnone(false);
  };
  return (
    <div className={Styles.App}>
      <button
        disabled={listening}
        className={!listening ? Styles.speak : Styles.speakclick}
        onClick={miconbutton}
      >
        Say
      </button>
      {noneof.home ? null : (
        <div className={Styles.textdiv}>
          {" "}
          <h3>{transcript}</h3>{" "}
        </div>
      )}
      {noneof.home ? (
        <Home />
      ) : (
        <Newscards
          className={Styles.newscards}
          count={count}
          articles={articles}
        />
      )}
      <button
        className={Styles.stop}
        onClick={stopbuttonclicked}
        style={{ display: none ? "block" : "none" }}
      >
        Stop
      </button>
    </div>
  );
};

export default App;
