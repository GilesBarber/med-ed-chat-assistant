import {OpenAI} from 'openai'
const key = import.meta.env.VITE_API_KEY_IHSE

const configuration = {
    apiKey: key,
    dangerouslyAllowBrowser: true
}

const openai = new OpenAI(configuration)

export default openai