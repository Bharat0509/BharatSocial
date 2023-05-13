import axios from 'axios'
//  'https://bharatsocial-ppi2.onrender.com'
const Axios = axios.create({baseURL: 'http://localhost:4000',withCredentials: true})

export default Axios
