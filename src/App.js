
import Styles from './App.module.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
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
 const [category,setcategory]=useState('');
 const [noneof,setnoneof]=useState(false);
const [source,setsource]=useState('');
const [systemaudio]=useState(['can you speak that again ?','Sorry I did not understand','can you repeat that ']);
const [transcript,settranscript]=useState('')
const [lang,setlang]=useState('en');
{/*}
  const commands=[{
    command:'(give) (me) (the) * news',
    callback:(newss)=>{
      settopheadlines('');
      setnewstopic(newss)
      setcategory('');
      setsource('')
      setnoneof(false)
    }
  },
{
  command: '(give) (the) top headlines from *',
  callback:(country)=>{
    if(country===' India') setcountry('in');
    settopheadlines('top-headlines');
    setnewstopic('');
    setcategory('');
    setsource('')
    setnoneof(false)
  }
  },
  {
    command:'(give) (some) * news',
    callback:(category)=>{
      if(category==='business'||category==='entertainment'||category==='world'||category==='health'||category==='science'||category==='sports'||category==='technology')
      {
        settopheadlines('top-headlines');
        setcategory(category);
        setnewstopic('');
        setsource('')

        setnoneof(false)

      }
    }},
    {
    command:'show (some) news from *',
    callback:(sour)=>setsource(sour)
  }
];
const { transcript } = useSpeechRecognition({commands}); */}
 
 
 
 
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
 if(topheadlines)
  {
    Axios.get(`/${topheadlines}?country=${country}&lang=${lang}${category?`&topic=${category}`:'breaking-news'}&token=${APIKEY}`).then((res)=>{
      
      setarticles(res.data.articles);
      window.speechSynthesis.speak(msg);
    
    }).catch(err=>
      console.log(err)
      );

  }
  {/*}
  if(source)
  {
    Axios.get(`/search?q=${source}token=${APIKEY}`).then(res=>{
      setarticles(res.data.articles);
      window.speechSynthesis.speak(msg);
    }).catch((err)=>console.log(err));

  }*/}
  if(noneof){
    var msga = new SpeechSynthesisUtterance(systemaudio[Math.floor(Math.random()*4)]);
    window.speechSynthesis.speak(msga);
  }


  },[newstopic,topheadlines,category,noneof,country,source,systemaudio])
useEffect(()=>{
  recognition.onresult=(e)=>{
const current=e.resultIndex;

settranscript(e.results[current][0].transcript);
const ar=transcript.split(" ");
if(ar[ar.length-1]=='news'){
let category=ar[ar.length-2];
if(category==='business'||category==='entertainment'||category==='world'||category==='health'||category==='science'||category==='sports'||category==='technology')
      {
        settopheadlines('top-headlines');
        setcategory(category);
        setnewstopic('');
        

        setnoneof(false);
       

      }
else{
  settopheadlines('');
setnewstopic(category)
setcategory('');

setnoneof(false)
}
}


else if(transcript.indexOf('top headlines')!==-1)
{console.log("yes")
  const country=ar[ar.length-1];
country=='India'?setcountry('in'):setcountry('us');

  settopheadlines('top-headlines');
  setnewstopic('');
  setcategory('');
  setsource('');
  setnoneof(false);

}
  }
console.log(articles)
})

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
