
import Styles from './Newscard.module.css'
const Newsimg='../news.png'
const Newscard=({article,count,id})=>{

    const {description,url,publishedAt,source,title,image} = article;

    return(
       
        
        <div className={Styles.mydiv}  style={count===id?{borderBottomWidth:"5px",borderBottomColor:'blue'}:null}  >
            
            <div className={Styles.imgdiv}>
            <img src={image} width="100%" height="100%" alt={Newsimg}  />
            </div>
            <div className={Styles.carddiv}  >
                <strong >
                {title}</strong>
                </div>
               <div className={Styles.sourcedate}> {(new Date(publishedAt)).toDateString()}
            
            <></>  source :{source.name}
              </div>
                <div className={Styles.description}>
                {description}
            </div>
            <button className={Styles.read}><a href={url}>Read more</a></button>
            
          
   
        </div>
     
    );
}
export default Newscard;