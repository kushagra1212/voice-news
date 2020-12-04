import react from 'react';
import axios from 'axios';

const Axios=axios.create({
    baseURL:'https://newsapi.org/v2'
})

export default Axios;