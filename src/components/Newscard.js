
import Styles from './Newscard.module.css'
const Newsimg='../news.png'
const Newscard=({article})=>{

    const {description,url,publishedAt,source,title,image} = article;

    return(
       
        
        <div className={Styles.mydiv}>
            
            <div className={Styles.imgdiv}>
            <img src={image} width="100%" height="100%" alt={Newsimg}  />
            </div>
            <div className={Styles.carddiv}  >
                <strong>
                {title}</strong>
                </div>
               <div className={Styles.sourcedate}> {(new Date(publishedAt)).toDateString()}
            
            <></>  source :{source.name}
              </div>
                <div className={Styles.description}>
                {description}
            </div>
            
          
   
        </div>
     
    );
}
export default Newscard;