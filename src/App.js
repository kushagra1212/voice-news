
import Styles from './App.module.css';

import {useEffect,useState} from 'react';
import Newscards from './components/Newscards'
import Axios from './axios.js';



  const SpeechRecognistion=window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition=new SpeechRecognistion();


recognition.onstart=()=>{
  console.log("listening your voice");
}


const APIKEY=process.env.REACT_APP_NEWSS_API_KEY;

const  App=()=> {
  
 
  const [newstopic,setnewstopic]=useState('');
  const [articles,setarticles]=useState([]);
  const [country,setcountry]=useState('us');
 const [topheadlines,settopheadlines]=useState('');
 const [category,setcategory]=useState('')
 const [noneof,setnoneof]=useState(false)
const [source,setsource]=useState('');
const [systemaudio]=useState(['can you speak that again ?','Sorry I did not understand','can you repeat that ']);
const [transcript,settranscript]=useState('')
const [lang,setlang]=useState('en');

 
 
 
  useEffect(()=>{
   
    let msg = new SpeechSynthesisUtterance('Here it is ');
  if(newstopic)
  {
    Axios.get(`/search?q=${newstopic}&token=${APIKEY}`).then((res)=>{
      setarticles(res.data.articles);
      window.speechSynthesis.speak(msg);
      
    }).catch(err=>
      console.log(err) );
  }
 else if(topheadlines)
  {
    Axios.get(`/${topheadlines}?country=${country}&lang=${lang}${category?`&topic=${category}`:'breaking-news'}&token=${APIKEY}`).then((res)=>{
      
      setarticles(res.data.articles);
      window.speechSynthesis.speak(msg);
    
    }).catch(err=>
      console.log(err)
      );

  }
  else if(noneof)
  {
console.log("not understand")
    let msga = new SpeechSynthesisUtterance(systemaudio[Math.floor(Math.random()*3)]);
    window.speechSynthesis.speak(msga);
  }
 
  



  },[newstopic,topheadlines,category,lang,noneof,country,source,systemaudio]);
  
  
   const shownews=(e)=>{
   
    
      const current=e.resultIndex;
      
      settranscript(e.results[current][0].transcript);
      let ar=e.results[current][0].transcript.split(" ");
      console.log(ar)
      if(ar[ar.length-1]==='news'){
      let cate=ar[ar.length-2];
      
      if(cate==='business'||cate==='entertainment'||cate==='world'||cate==='health'||cate==='science'||cate==='sports'||cate==='technology')
            {
              console.log(cate)
              
              settopheadlines('top-headlines');
              setcategory(cate);
              setnewstopic('');
              
              setnoneof(false)
             
           
      
            }
      else{
        settopheadlines('');
      setnewstopic(cate)
      setcategory('');
      setnoneof(false)
      
      
      }
      }
      
      
      else if(transcript.indexOf('top headlines')!==-1)
      {
        const country=ar[ar.length-1];
      country==='India'?setcountry('in'):setcountry('us');
      
        settopheadlines('top-headlines');
        setnewstopic('');
        setcategory('');
        setsource('');
        setnoneof(false)
      
      }
     
      else{
        setnoneof(true)
        setnewstopic('');
        setcategory('');
        setsource('');
        settopheadlines('');
      } 
      
        
   }
  
  useEffect(()=>{
    recognition.onresult=(e)=>{
      const current=e.resultIndex;
      console.log(e.results[current][0].transcript)
      console.log(transcript)
      if(e.results[current][0].transcript!==transcript)
      {
        
        shownews(e);
      }
      
    }
   
  },[transcript])
   
  
  const miconbutton=()=>{
   
  
    var msg = new SpeechSynthesisUtterance('listening');
    window.speechSynthesis.speak(msg);
    
      recognition.start();
       
    
  
  
      


  
  }
  
 
  return (
    <div className="App">
 
     <button onClick={miconbutton}  >Say</button>
     {transcript}
    {articles? <Newscards className={Styles.newscards} articles={articles}  />:null}
    </div>
  );
}

export default App;
