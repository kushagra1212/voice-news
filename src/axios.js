
import axios from 'axios';

const Axios=axios.create({
    baseURL:'https://gnews.io/api/v4'
})

export default Axios;