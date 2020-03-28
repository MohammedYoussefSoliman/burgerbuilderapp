import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://react-burger-28285.firebaseio.com/'
})

export default instance