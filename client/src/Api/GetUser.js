import axios from 'axios'
const API = axios.create({baseURL: 'https://bharatsocial-infc.onrender.com'})

export const getUser = (id) => {
  console.log(`https://bharatsocial-infc.onrender.com/user/${id}`)
  return API.get(`/user/${id}`)
}
