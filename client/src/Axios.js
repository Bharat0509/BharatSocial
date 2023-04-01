import axios from 'axios'

const Axios = axios.create({baseURL: 'https://bharatsocial-ppi2.onrender.com',withCredentials: true})

export default Axios
