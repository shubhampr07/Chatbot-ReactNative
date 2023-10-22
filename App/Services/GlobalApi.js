import axios from "axios"


const BASE_URL  = 'https://google-bard-api-backend.vercel.app/'

const getBardApi = (userMsg) => axios.get(BASE_URL+"?ques="+userMsg);

export default {
    getBardApi
}