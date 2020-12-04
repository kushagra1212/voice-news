
import Styles from './Newscard.module.css'
const Newscard=({article})=>{

    const {description,publishedAt,source,title,image} = article;
console.log(article)
    return(
        <div className={Styles.maincarddiv}>
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
    );
}
export default Newscard;