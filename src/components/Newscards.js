
import Newscard from './Newscard'
import Styles from './Newscards.module.css'
const Newscards=({articles})=>{
 
    return(
<div className={Styles.maindiv}>

{articles.map((article,id)=>  <div key={id}>
   <Newscard  article={article} />
   </div>)}

   </div>
    )
}
export default Newscards;