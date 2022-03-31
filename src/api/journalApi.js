import axios from 'axios'

const journalApi = axios.create({

    baseURL: 'https://vue-demos-e7f84-default-rtdb.firebaseio.com/',
    
})

export default journalApi