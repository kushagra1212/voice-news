

import Newscard from './Newscard'
import Styles from './Newscards.module.css'
const Newscards=({articles,count})=>{
    
  
   
        
     
      
  


    return(
<div className={Styles.maindiv}>

{articles.map((article,id)=>  <div  key={id}>
   
   <Newscard   article={article} count={count}  i={id} />
   </div>)}

   </div>
    )
}
export default Newscards;