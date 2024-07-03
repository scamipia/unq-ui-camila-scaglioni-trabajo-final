import Axios from 'axios'

export const API_BASE_URL = 'https://preguntados-api.vercel.app'

const get = (url) => 
    Axios.get(url)
        .then((response) => response)
        .catch((error) => Promise.reject(error.response.data))

const post = (url, body) => 
    Axios.post(url, body)
        .then((response) => response)
        .catch((error) => Promise.reject(error.response.data))


const getDifficulty = () => {
    return get(`${API_BASE_URL}/api/difficulty`)
}

const getQuestions = (difficulty = 'easy') => {
    return get(`${API_BASE_URL}/api/questions?difficulty=${difficulty}`);
};

const postAnswer = (body) => {
    return post(`${API_BASE_URL}/api/answer`, body)
}


const Api = {
    getDifficulty,
    getQuestions,
    postAnswer
}

export default Api