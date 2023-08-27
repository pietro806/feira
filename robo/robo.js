import wppconnect from '@wppconnect-team/wppconnect'
import {example} from './api/chatgpt.js'

wppconnect.create({
    session: 'whatsbot', 
    autoClose: false, 
    puppeteerOptions: { args: ['--no-sandbox'] }
})

.then((client) => 

    client.onMessage((message) => {
        let resposta = ''
        Chat()
        async function Chat() {
            resposta = await example(message.body)
            console.log(resposta);
            client.sendText(message.from, resposta) 
            
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
