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
          msg=new SpeechSynthesisUtterance("would you want me to read that ?");
       
         
          window.speechSynthesis.speak(msg);
           setlistening(true);
recognition.start();
    
 
        })
        .catch((err) => console.log(err));
    } 
  },[newstopic])

  useEffect(()=>{
    let msg = new SpeechSynthesisUtterance("Here it is ");
    if (topheadlines) {
      Axios.get(
        `/${topheadlines}?${
          category.length>1 ? `&topic=${category}` : "&topic=breaking-news"
}&lang=${lang}${country.length>1?`&country=${country}`:"&country=us"}&token=${APIKEY}`
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
  },[category])
  
  useEffect(() => {
    
  if (noneof.notunderstand) {
      console.log("did not understand");
      let msg = new SpeechSynthesisUtterance(
        systemaudio[Math.floor(Math.random() * 3)]
      );
      window.speechSynthesis.speak(msg);
        
      
    }
  }, [ noneof 
  ]);

  const shownews = (e) => {
    const current = e.resultIndex;

    settranscript(e.results[current][0].transcript);
    let temp=e.results[current][0].transcript;
    let ar = e.results[current][0].transcript.split(" ");
    console.log(ar);
    if (temp.indexOf("news") !== -1 && temp.indexOf("India")===-1) {
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
        setcategory(cate);       //show me sports news
        setnewstopic("");
        setsource("");
        setcountry("");
        setnoneof({notunderstand:false,home:false});
      } else {
        settopheadlines("");
        setnewstopic(cate);      // give me bitcoin news
        setcategory("");
        setsource("");
        setcountry("");
        setnoneof({notunderstand:false,home:false});
      }
    } else if (temp.indexOf("top") !== -1) {
      const country = ar[ar.length - 1]; //show me top news from india
      country === "India" ? setcountry("in") : setcountry("");
      country === "Tamil" ? setcountry("ta") : setcountry("");
      settopheadlines("top-headlines");
      setnewstopic("");
      setcategory("");
      setsource("");
      setnoneof({notunderstand:false,home:false});
    }
    else if(temp.indexOf("India")!==-1){
      const lan=ar[ar.length-1];
      const cat=ar[ar.length-4];      //show me  news from india
      
      settopheadlines("top-headlines");
      const art=["business","entertainment","world","health","science","sports","technology" ]
      for(let i=0;i<art.length;i++)
      {
        if(temp.indexOf(art[i])!==-1)
        {
          setcategory(art[i]); 
        }
      }
     //show me sports news from india
     if(lang==='Hindi')   setlang('hi')  //show me sports news from india in Hindi
      setcountry("in");
      setsource("");
      setnewstopic("");
      setnoneof({notunderstand:false,home:false});
      
    }
    else if(temp.indexOf("go home")!==-1||transcript.indexOf("go back")!==-1)
    {
      setnoneof({notunderstand:false,home:true});
      setnewstopic("");
      setcategory("");
      setsource("");
      settopheadlines("");
    }
    else if(temp.indexOf("yes")!==-1)
    {
      console.log("cane")
      setnoneof({notunderstand:false,home:false});
      setnewstopic("");
      setcategory("");
      setsource("");
      settopheadlines("");
      for(let i=0;i<articles.length;i++)
      {
        let ms=new SpeechSynthesisUtterance(articles[i].title);
       window.speechSynthesis.speak(ms);
        if(i===2)
        {
          ms=new SpeechSynthesisUtterance("should I continue")
          window.speechSynthesis.speak(ms);
          setlistening(false)
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
    
      <button disabled={listening} className={!listening?Styles.speak:Styles.speakclick} onClick={miconbutton}>Say</button>
  {noneof.home?null:<div className={Styles.textdiv}   > <h3>{transcript}</h3> </div>} 
      {noneof.home || noneof.notunderstand? (
       <Home/> 
      ) :  <Newscards className={Styles.newscards} articles={articles} />}
    </div>
  );
};

export default App;
