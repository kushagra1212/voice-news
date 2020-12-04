
import Styles from './App.module.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {useEffect,useState} from 'react';
import Newscards from './components/Newscards'
import Axios from './axios.js';



  





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
      if(category==='business'||category==='entertainment'||category==='general'||category==='health'||category==='science'||category==='sports'||category==='technology')
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
  const { transcript } = useSpeechRecognition({commands});
 
  console.log(transcript)
 
 
  useEffect(()=>{
   
    let msg = new SpeechSynthesisUtterance('Here it is ');
  if(newstopic)
  {
    Axios.get(`/everything?q=${newstopic}&apiKey=${APIKEY}`).then((res)=>{
      setarticles(res.data.articles);
      window.speechSynthesis.speak(msg);
      
    }).catch(err=>
      console.log(err) );
  }
 if(topheadlines)
  {
    Axios.get(`/${topheadlines}?country=${country}${category?`&category=${category}`:''}&apiKey=${APIKEY}`).then((res)=>{
      
      setarticles(res.data.articles);
      window.speechSynthesis.speak(msg);
    
    }).catch(err=>
      console.log(err)
      );

  }
  if(source)
  {
    Axios.get(`/sources?apiKey=${APIKEY}`).then(res=>{
      setarticles(res.data.sources.filter(sour=>sour.name===source.toLowerCase().trim(' ').join('-')));
      window.speechSynthesis.speak(msg);
    }).catch((err)=>console.log(err));

  }
  if(noneof){
    var msga = new SpeechSynthesisUtterance(systemaudio[Math.floor(Math.random()*4)]);
    window.speechSynthesis.speak(msga);
  }


  },[newstopic,topheadlines,category,noneof,country,source,systemaudio])


  const miconbutton=()=>{
    SpeechRecognition.startListening();
    console.log("listening")
    var msg = new SpeechSynthesisUtterance('listening');
    window.speechSynthesis.speak(msg);
   
 
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
