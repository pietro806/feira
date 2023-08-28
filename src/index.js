import wppconnect from '@wppconnect-team/wppconnect'
import {respostaGPT} from './api/chatgpt.js'
import { ChatGPTAPI } from 'chatgpt'

const api = new ChatGPTAPI({
    apiKey: process.env.KEY
})

wppconnect.create({
    session: 'whatsbot', 
    autoClose: false, 
    puppeteerOptions: { args: ['--no-sandbox'] }
})

.then((client) => 

    client.onMessage((message) => {

        if (!message.isGroupMsg)
            Chat()

        async function Chat() {
            client.sendText(message.from, '*Carregando resposta...*');
            client.sendText(message.from, await respostaGPT(api, message.body))
            
            .then((result) => {
                console.log('Pong retornado: ', result)
            })
            
            .catch((erro) => {
                console.log('erro: ', erro)
            })
        }
    })
        
)

.catch((error) => {
    console.log(error)
})