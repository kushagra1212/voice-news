
import Styles from './Newscard.module.css'

const Newscard=({article})=>{

    const {description,url,publishedAt,source,title,image} = article;

    return(
        <a href={url}>
        <div  className={Styles.maincarddiv}>
            <div className={Styles.imgdiv}>
            <img src={image}  alt='' />
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
        </a>
    );
}
export default Newscard;