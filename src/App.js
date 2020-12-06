import Styles from "./App.module.css";

import { useEffect, useState } from "react";
import Newscards from "./components/Newscards";
import Axios from "./axios.js";
import Home from './components/Home'
const SpeechRecognistion =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognistion();

recognition.onstart = () => {
  console.log("listening your voice");
};

const APIKEY = process.env.REACT_APP_NEWSS_API_KEY;

const App = () => {
  const [newstopic, setnewstopic] = useState("");
  const [articles, setarticles] = useState([]);
  const [country, setcountry] = useState("us");
  const [topheadlines, settopheadlines] = useState("");
  const [category, setcategory] = useState("");
  const [noneof, setnoneof] = useState({notunderstand:false,home:true});
  const [source, setsource] = useState("");
  const [systemaudio] = useState([
    "can you speak that again ?",
    "Sorry I did not understand",
    "can you repeat that ",
  ]);
  const [transcript, settranscript] = useState("");
  const [lang, setlang] = useState("en");
  const [listening,setlistening]=useState(false)

  useEffect(()=>{
    let msg = new SpeechSynthesisUtterance("Here it is ");
    if (newstopic) {
      Axios.get(`/search?q=${newstopic}&token=${APIKEY}`)
        .then((res) => {
          setarticles(res.data.articles);
          window.speechSynthesis.speak(msg);
      

    
 
        })
        .catch((err) => console.log(err));
    } 
  },[newstopic])

  useEffect(()=>{
    let msg = new SpeechSynthesisUtterance("Here it is ");
    if (topheadlines) {
      Axios.get(
        `/${topheadlines}?country=${country}&lang=${lang}${
          category ? `&topic=${category}` : "breaking-news"
        }&token=${APIKEY}`
      )
        .then((res) => {
          setarticles(res.data.articles);
          window.speechSynthesis.speak(msg);
          
         msg=new SpeechSynthesisUtterance("would you want me to read that ?");
       
         
           window.speechSynthesis.speak(msg);
            setlistening(true);
            recognition.start();
         
  
        })
        .catch((err) => console.log(err));
    } 
  },[topheadlines])
  
  useEffect(() => {
    
  if (noneof.notunderstand) {
      console.log("did not understand");
      let msga = new SpeechSynthesisUtterance(
        systemaudio[Math.floor(Math.random() * 3)]
      );
      window.speechSynthesis.speak(msga);
    }
  }, [ noneof 
  ]);

  const shownews = (e) => {
    const current = e.resultIndex;

    settranscript(e.results[current][0].transcript);
    
    let ar = e.results[current][0].transcript.split(" ");
    console.log(ar);
    if (ar[ar.length - 1] === "news") {
      let cate = ar[ar.length - 2];

      if (
        cate === "business" ||
        cate === "entertainment" ||
        cate === "world" ||
        cate === "health" ||
        cate === "science" ||
        cate === "sports" ||
        cate === "technology"
      ) {
        console.log(cate);

        settopheadlines("top-headlines");
        setcategory(cate);
        setnewstopic("");
        setsource("");
        setnoneof({notunderstand:false,home:false});
      } else {
        settopheadlines("");
        setnewstopic(cate);
        setcategory("");
        setsource("");
        setnoneof({notunderstand:false,home:false});
      }
    } else if (transcript.indexOf("top headlines") !== -1) {
      const country = ar[ar.length - 1];
      country === "India" ? setcountry("in") : setcountry("us");

      settopheadlines("top-headlines");
      setnewstopic("");
      setcategory("");
      setsource("");
      setnoneof({notunderstand:false,home:false});
    }
    else if(transcript.indexOf("go home")!==-1||transcript.indexOf("go back")!==-1)
    {
      setnoneof({notunderstand:false,home:true});
      setnewstopic("");
      setcategory("");
      setsource("");
      settopheadlines("");
    }
    else if(ar[ar.length - 1]==="yes")
    {
      console.log("cane")
      setnoneof({notunderstand:false,home:false});
      setnewstopic("");
      setcategory("");
      setsource("");
      settopheadlines("");
      for(let i=0;i<articles.length;i++)
      {
        let ms=new SpeechSynthesisUtterance(`${articles[i].title}`);
        window.speechSynthesis.speak(ms);
        if(i==2)
        {
          ms=new SpeechSynthesisUtterance("should I continue")
          window.speechSynthesis.speak(ms);
          return;
          
        }
      }
   /*}    if(id===2)
       {
        ms=new SpeechSynthesisUtterance("should I continue");
        window.speechSynthesis.speak(ms);
        recognition.start();
        listening(true);
        recognition.onresult=(e)=>{
          let arr = e.results[e.resultIndex][0].transcript.split(" ");
          if(!arr[arr.length-1]==="yes")
          {
            return;

          }
        }
       } */

      }
    
    else {
      setnoneof({notunderstand:true,home:false});
      setnewstopic("");
      setcategory("");
      setsource("");
      settopheadlines("");
    }
  };

  useEffect(() => {
    
    recognition.onresult = (e) => {
      const current = e.resultIndex;
      
     
      console.log(e.results[current][0].transcript);
      console.log(transcript);
      if (e.results[current][0].transcript !== transcript) {
        shownews(e);
        
      }
    };
  },[transcript]);
  useState(()=>{
    recognition.onend=()=>{
      setlistening(false);
    }
  })

  const miconbutton = () => {
    var msg = new SpeechSynthesisUtterance("listening");
    window.speechSynthesis.speak(msg);
   
    setlistening(true) ;
recognition.start();

   
  
  };

  return (
    <div className={Styles.App}>
      <button disabled={listening} className={!listening?Styles.speak:Styles.speakclick} onClick={miconbutton}><span>🎙️</span></button>
  {noneof.home?null:<div className={Styles.textdiv}   > <h3>{transcript}</h3> </div>}
      {noneof.home? (
       <Home/> 
      ) :  <Newscards className={Styles.newscards} articles={articles} />}
    </div>
  );
};

export default App;
